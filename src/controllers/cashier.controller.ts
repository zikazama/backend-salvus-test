import { getRepository, In, IsNull, LessThan, MoreThan } from "typeorm";
import { Admin } from "../entity/Admin";
import { successPaginateResponse, successResponse } from "../utils/response";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getPagination, getPagingData } from "../utils/pagination";
import { OvertimeAssignment } from "../entity/OvertimeAssigment";
import { Transaction } from "../entity/Transaction";
import { Cashier } from "../entity/Cashier";
import moment from 'moment';
import { TransactionItem } from "../entity/TransactionItem";
import { v4 as uuidv4 } from 'uuid';
import { Menu } from "../entity/Menu";

// POST /api/login
const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const cashierRepository = getRepository(Cashier);
    const cashier = await cashierRepository.findOne({ where: { email, deleted_at: IsNull() } });

    if (!cashier) return res.status(401).json({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, cashier.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ cashier_uid: cashier.cashier_uid, role: 'cashier', email: cashier.email }, process.env.SECRET_KEY!, { expiresIn: '23h' });
    successResponse(res, { token });
};

// GET /api/dashboard
const dashboard = async (req: Request, res: Response) => {

    const overtimeRepository = getRepository(OvertimeAssignment);
    const transactionRepository = getRepository(Transaction);
    const transactionItemRepository = getRepository(TransactionItem);
    const overtimes = await overtimeRepository.createQueryBuilder('o')
        .where('DATE(o.created_at) = CURDATE() AND o.deleted_at IS NULL')
        .getMany();
    const transactions = await transactionRepository.createQueryBuilder('t')
        .where('DATE(t.created_at) = CURDATE() AND t.deleted_at IS NULL')
        .getMany();
    const transaction_uids = transactions.map(t => t.transaction_uid);
    const transaction_items = await transactionItemRepository.createQueryBuilder('ti')
        .where({
            transaction_uid: In(transaction_uids),
            deleted_at: IsNull()
        })
        .getMany();

    const total_overtime = overtimes.reduce((acc, o) => acc + o.overtime_hour, 0);
    const total_transaction = transactions.reduce((acc, t) => acc + t.total_transaction, 0);
    const total_transaction_item = transaction_items.reduce((acc, ti) => acc + ti.subtotal, 0);
    const total_menu = transaction_items.reduce((acc, ti) => acc + ti.quantity, 0);

    successResponse(res, {
        total_overtime,
        total_transaction,
        total_transaction_item,
        total_menu,
    });
};

// GET /api/menus/dropdown
const getMenuDropdown = async (req: Request, res: Response) => {
    const menuRepository = getRepository(Menu);
    const menus = await menuRepository.find({
        where: { deleted_at: IsNull() },
    });

    successResponse(res, menus);
};


// POST /api/transactions
const createTransaction = async (req: Request | any, res: Response) => {

    const transactionRepository = getRepository(Transaction);
    const transaction = await transactionRepository.save({
        ...req.body,
        total_transaction: 0,
        cashier_uid: req.user?.cashier_uid,
        status: 'PROGRESS',
        transaction_uid: uuidv4(),
        created_at: new Date(),
        updated_at: new Date(),
    })

    successResponse(res, transaction, 'Success created data', 201);
};

// POST /api/transactions/:transaction_uid/submit
const submitTransaction = async (req: Request | any, res: Response) => {

    const transactionRepository = getRepository(Transaction);
    const transaction = await transactionRepository.update({
        transaction_uid: req.params.transaction_uid,
        deleted_at: IsNull()
    },{
        status: 'DONE',
        cashier_uid: req.user?.cashier_uid,
        updated_at: new Date(),
    })

    successResponse(res, transaction, 'Success Submit data', 201);
};

// GET /api/transactions
const listTransactions = async (req: Request, res: Response) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(Number(page), Number(size));

    const transactionRepository = getRepository(Transaction);
    const [configs, total] = await transactionRepository.findAndCount({
        take: limit,
        skip: offset,
        where: { deleted_at: IsNull(), created_at: MoreThan(moment().format('YYYY-MM-DD')) },
    });

    const response = getPagingData([configs, total], Number(page), limit);
    successPaginateResponse(res, response);
};

// GET /api/transactions/:transaction_uid
const getTransaction = async (req: Request, res: Response) => {

    const transactionRepository = getRepository(Transaction);
    const config = await transactionRepository.findOne({
        where: { transaction_uid: req.params.transaction_uid, deleted_at: IsNull() },
    });

    successResponse(res, config);
};

// PUT /api/transactions/:transaction_uid
const updateTransaction = async (req: Request | any, res: Response) => {

    const configRepository = getRepository(Transaction);
    const config = await configRepository.update({
        transaction_uid: req.params.transaction_uid,
        deleted_at: IsNull()
    }, {
        ...req.body,
        cashier_uid: req.user?.cashier_uid,
        updated_at: new Date(),
    })

    successResponse(res, config, 'Success updated data', 201);
};

// DELETE /api/transactions/:transaction_id
const deleteTransaction = async (req: Request | any, res: Response) => {

    const configRepository = getRepository(Transaction);
    const config = await configRepository.update({
        transaction_uid: req.params.transaction_uid
    }, {
        cashier_uid: req.user?.cashier_uid,
        deleted_at: new Date(),
    })

    successResponse(res, config, 'Success deleted data', 204);
};

// POST /api/transactions/:transaction_uid/transaction-item
const createTransactionItem = async (req: Request, res: Response) => {


    const transactionItemRepository = getRepository(TransactionItem);
    const menuRepository = getRepository(Menu);
    const transactionRepository = getRepository(Transaction);
    const menu = await menuRepository.findOne({
        where: { menu_uid: req.body.menu_uid, deleted_at: IsNull() },
    });
    const transactionItem = await transactionItemRepository.save({
        ...req.body,
        transaction_item_uid: uuidv4(),
        transaction_uid: req.params.transaction_uid,
        subtotal: (menu?.price ?? 0) * req.body.quantity,
        created_at: new Date(),
        updated_at: new Date(),
    })
    const transaction = await transactionRepository.findOne({
        where: {transaction_uid: req.params.transaction_uid},
    });
    await transactionRepository.update({
        transaction_uid: req.params.transaction_uid,
    }, {
        total_transaction: (transaction?.total_transaction ?? 0) + (menu?.price ?? 0) * req.body.quantity,
    })

    successResponse(res, transactionItem, 'Success created data', 201);
};

// GET /api/transactions/:transaction_uid/transaction-item
const listTransactionItems = async (req: Request, res: Response) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(Number(page), Number(size));

    const transactionItemRepository = getRepository(TransactionItem);
    const [transactionItems, total] = await transactionItemRepository.findAndCount({
        take: limit,
        skip: offset,
        where: {
            deleted_at: IsNull(),
            transaction_uid: req.params.transaction_uid,
        },
    });

    const response = getPagingData([transactionItems, total], Number(page), limit);
    successPaginateResponse(res, response);
};

// GET /api/transactions/:transaction_uid/transaction-item/:transaction_item_uid
const getTransactionItem = async (req: Request, res: Response) => {

    const transactionItemRepository = getRepository(TransactionItem);
    const transactionItem = await transactionItemRepository.findOne({
        where: { transaction_item_uid: req.params.transaction_item_uid, transaction_uid: req.params.transaction_uid, deleted_at: IsNull() },
    });

    successResponse(res, transactionItem);
};

// PUT /api/transactions/:transaction_uid/transaction-item/:transaction_item_uid
const updateTransactionItem = async (req: Request, res: Response) => {

    const transactionItemRepository = getRepository(TransactionItem);
    const menuRepository = getRepository(Menu);
    const transactionRepository = getRepository(Transaction);
    const currentTransactionItem = await transactionItemRepository.findOne({
        where: { transaction_item_uid: req.params.transaction_item_uid, transaction_uid: req.params.transaction_uid, deleted_at: IsNull() },
    })
    const currentMenu = await menuRepository.findOne({
        where: { menu_uid: currentTransactionItem?.menu_uid, deleted_at: IsNull() },
    });
    const menu = await menuRepository.findOne({
        where: { menu_uid: req.body.menu_uid, deleted_at: IsNull() },
    });
    const transactionItem = await transactionItemRepository.update({
        transaction_item_uid: req.params.transaction_item_uid,
        transaction_uid: req.params.transaction_uid,
        deleted_at: IsNull()
    }, {
        ...req.body,
        subtotal: (menu?.price ?? 0) * req.body.quantity,
        updated_at: new Date(),
    })
    const transaction = await transactionRepository.findOne({
        where: {transaction_uid: req.params.transaction_uid},
    });
    await transactionRepository.update({
        transaction_uid: req.params.transaction_uid,
    }, {
        total_transaction: (transaction?.total_transaction ?? 0) + (menu?.price ?? 0) * req.body.quantity - (currentMenu?.price ?? 0) * (currentTransactionItem?.quantity ?? 0),
    })

    successResponse(res, transactionItem, 'Success updated data', 201);
};

// DELETE /api/transactions/:transaction_uid/transaction-item/:transaction_item_uid
const deleteTransactionItem = async (req: Request, res: Response) => {

    const transactionItemRepository = getRepository(TransactionItem);
    const transactionRepository = getRepository(Transaction);
    const menuRepository = getRepository(Menu);
    const currentTransactionItem = await transactionItemRepository.findOne({
        where: { transaction_item_uid: req.params.transaction_item_uid, transaction_uid: req.params.transaction_uid, deleted_at: IsNull() },
    })
    const currentMenu = await menuRepository.findOne({
        where: { menu_uid: currentTransactionItem?.menu_uid, deleted_at: IsNull() },
    });
    const transactionItem = await transactionItemRepository.update({
        transaction_item_uid: req.params.transaction_item_uid,
        transaction_uid: req.params.transaction_uid,
        deleted_at: IsNull()
    }, {
        deleted_at: new Date(),
    })

    const transaction = await transactionRepository.findOne({
        where: {transaction_uid: req.params.transaction_uid},
    });
    await transactionRepository.update({
        transaction_uid: req.params.transaction_uid,
    }, {
        total_transaction: (transaction?.total_transaction ?? 0) - (currentMenu?.price ?? 0) * (currentTransactionItem?.quantity ?? 0),
    })

    successResponse(res, transactionItem, 'Success deleted data', 204);
};


export {
    login,
    dashboard,
    createTransaction,
    listTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction,
    createTransactionItem,
    listTransactionItems,
    getTransactionItem,
    updateTransactionItem,
    deleteTransactionItem,
    getMenuDropdown,
    submitTransaction
};
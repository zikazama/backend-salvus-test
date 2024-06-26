
import {
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
    submitTransaction,
} from '../controllers/cashier.controller';
import { Router } from 'express';
import { authenticateCashier } from '../middlewares/auth.middleware';

const router = Router();

router.post('/login', login);
router.get('/dashboard', authenticateCashier, dashboard);
router.get('/menus/dropdown', authenticateCashier, getMenuDropdown);
router.post('/transactions', authenticateCashier, createTransaction);
router.post('/transactions/:transaction_uid/submit', authenticateCashier, submitTransaction);
router.get('/transactions', authenticateCashier, listTransactions);
router.get('/transactions/:transaction_uid', authenticateCashier, getTransaction);
router.put('/transactions/:transaction_uid', authenticateCashier, updateTransaction);
router.delete('/transactions/:transaction_uid', authenticateCashier, deleteTransaction);
router.post('/transactions/:transaction_uid/transaction-items', authenticateCashier, createTransactionItem);
router.get('/transactions/:transaction_uid/transaction-items', authenticateCashier, listTransactionItems);
router.get('/transactions/:transaction_uid/transaction-items/:transaction_item_uid', authenticateCashier, getTransactionItem);
router.put('/transactions/:transaction_uid/transaction-items/:transaction_item_uid', authenticateCashier, updateTransactionItem);
router.delete('/transactions/:transaction_uid/transaction-items/:transaction_item_uid', authenticateCashier, deleteTransactionItem);

export default router;

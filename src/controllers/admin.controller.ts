// src/controllers/adminController.ts
import { Request, Response } from 'express';
import { IsNull, Transaction, getRepository } from 'typeorm';
import { Admin } from '../entity/Admin';
import { Config } from '../entity/Config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();
import { getPagination, getPagingData } from '../utils/pagination';
import { successPaginateResponse, successResponse } from '../utils/response';
import { OvertimeAssignment } from '../entity/OvertimeAssigment';

// POST /api/login/admin
const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const adminRepository = getRepository(Admin);
  const admin = await adminRepository.findOne({ where: { email, deleted_at: IsNull() } });

  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

  const validPassword = await bcrypt.compare(password, admin.password);
  if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ admin_uid: admin.admin_uid, role: 'admin', email: admin.email }, process.env.SECRET_KEY!, { expiresIn: '1h' });
  successResponse(res, { token });
};

// GET /api/configs
const listConfigs = async (req: Request, res: Response) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(Number(page), Number(size));

  const configRepository = getRepository(Config);
  const [configs, total] = await configRepository.findAndCount({
    take: limit,
    skip: offset,
    where: { deleted_at: IsNull() },
  });

  const response = getPagingData([configs, total], Number(page), limit);
  successPaginateResponse(res, response);
};

// POST /api/configs
const createConfig = async (req: Request, res: Response) => {

  const configRepository = getRepository(Config);
  const config = await configRepository.save({
    ...req.body,
    config_uid: uuidv4(),
    created_at: new Date(),
    updated_at: new Date(),
  })

  successResponse(res, config, 'Success created data', 201);
};

// GET /api/configs/:config_uid
const getConfig = async (req: Request, res: Response) => {

  const configRepository = getRepository(Config);
  const config = await configRepository.findOne({
    where: { config_uid: req.params.config_uid, deleted_at: IsNull() },
  });

  successResponse(res, config);
};

// PUT /api/configs/:config_uid
const updateConfig = async (req: Request, res: Response) => {

  const configRepository = getRepository(Config);
  const config = await configRepository.update({
    config_uid: req.params.config_uid,
    deleted_at: IsNull()
  }, {
    ...req.body,
    updated_at: new Date(),
  })

  successResponse(res, config, 'Success updated data', 201);
};

// DELETE /api/configs/:config_uid
const deleteConfig = async (req: Request, res: Response) => {

  const configRepository = getRepository(Config);
  const config = await configRepository.update({
    config_uid: req.params.config_uid
  }, {
    deleted_at: new Date(),
  })

  successResponse(res, config, 'Success deleted data', 204);
};

// GET /api/transactions-with-items
const getTransactionWithItems = async (req: Request, res: Response) => {

  const transactionRepository = getRepository(Transaction);
  const config = await transactionRepository.findOne({
    where: { deleted_at: IsNull() },
    relations: ['transaction_items']
  });

  successResponse(res, config);
};

// POST /api/overtimes
const createOvertime = async (req: Request, res: Response) => {

  const overtimeRepository = getRepository(OvertimeAssignment);
  const overtime = await overtimeRepository.save({
    ...req.body,
    overtime_assigment_uid: uuidv4(),
    created_at: new Date(),
    updated_at: new Date(),
  })

  successResponse(res, overtime, 'Success created data', 201);
};

// GET /api/overtimes
const listOvertimes = async (req: Request, res: Response) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(Number(page), Number(size));

  const overtimeRepository = getRepository(OvertimeAssignment);
  const [overtimes, total] = await overtimeRepository.findAndCount({
    take: limit,
    skip: offset,
    where: { deleted_at: IsNull() },
  });

  const response = getPagingData([overtimes, total], Number(page), limit);
  successPaginateResponse(res, response);
};

// GET /api/overtimes/:overtime_assigment_uid
const getOvertime = async (req: Request, res: Response) => {

  const overtimeRepository = getRepository(OvertimeAssignment);
  const overtime = await overtimeRepository.findOne({
    where: { overtime_assigment_uid: req.params.overtime_assigment_uid, deleted_at: IsNull() },
  });

  successResponse(res, overtime);
};

// PUT /api/overtimes/:overtime_assigment_uid
const updateOvertime = async (req: Request, res: Response) => {

  const overtimeRepository = getRepository(OvertimeAssignment);
  const overtime = await overtimeRepository.update({
    overtime_assigment_uid: req.params.overtime_assigment_uid,
    deleted_at: IsNull()
  }, {
    ...req.body,
    updated_at: new Date(),
  })

  successResponse(res, overtime, 'Success updated data', 201);
};

// DELETE /api/overtimes/:overtime_assigment_uid
const deleteOvertime = async (req: Request, res: Response) => {

  const overtimeRepository = getRepository(OvertimeAssignment);
  const overtime = await overtimeRepository.update({
    overtime_assigment_uid: req.params.overtime_assigment_uid
  }, {
    deleted_at: new Date(),
  })

  successResponse(res, overtime, 'Success deleted data', 204);
};

export {
  adminLogin,
  listConfigs,
  createConfig,
  getConfig,
  updateConfig,
  deleteConfig,
  getTransactionWithItems,
  createOvertime,
  listOvertimes,
  getOvertime,
  updateOvertime,
  deleteOvertime
};

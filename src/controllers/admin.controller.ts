// src/controllers/adminController.ts
import { Request, Response } from 'express';
import { Admin, Config, OvertimeAssignment, Transaksi, TransaksiItem } from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { getPagination, getPagingData } from '../utils/pagination';

const getConfigs = async (req: Request, res: Response) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page as any, size as any);

  const data = await Config.findAndCountAll({ limit, offset });
  const response = getPagingData(data, page as any, limit);

  res.json(response);
};

const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const admin: any = await Admin.findOne({ where: { email } });

  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

  const validPassword = await bcrypt.compare(password, admin.password);
  if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ admin_id: admin.admin_id }, process.env.SECRET_KEY!, { expiresIn: '1h' });
  res.json({ token });
};

// Implement other admin controllers for configs, transactions, overtimes...

export {
  adminLogin,
  getConfigs
  // other controllers
};

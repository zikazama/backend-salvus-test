// src/controllers/adminController.ts
import { Request, Response } from 'express';
import { IsNull, getRepository } from 'typeorm';
import { Admin } from '../entity/Admin';
import { Config } from '../entity/Config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { getPagination, getPagingData } from '../utils/pagination';

const getConfigs = async (req: Request, res: Response) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(Number(page), Number(size));

  const configRepository = getRepository(Config);
  const [configs, total] = await configRepository.findAndCount({
    take: limit,
    skip: offset,
    where: { deleted_at: IsNull() }, // Optional: If you want to exclude soft-deleted records
  });

  const response = getPagingData([configs, total], Number(page), limit);
  res.json(response);
};

const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const adminRepository = getRepository(Admin);
  const admin = await adminRepository.findOne({ where: { email } });

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

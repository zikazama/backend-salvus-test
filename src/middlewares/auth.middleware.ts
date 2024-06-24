// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticateAdmin = (req: Request | any, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded: any = jwt.verify(token, process.env.SECRET_KEY ?? 'default');
        if(decoded?.role !== 'admin') {
            throw new Error("Role Restricted");
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

const authenticateCashier = (req: Request | any, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded: any = jwt.verify(token, process.env.SECRET_KEY ?? 'default');
        if(decoded?.role !== 'cashier') {
            throw new Error("Role Restricted");
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

export { authenticateAdmin, authenticateCashier };

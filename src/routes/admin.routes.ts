// src/routes/adminRoutes.ts
import { Router } from 'express';
import {
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
} from '../controllers/admin.controller';
import { authenticateAdmin } from '../middlewares/auth.middleware';

const router = Router();

router.post('/login/admin', authenticateAdmin, adminLogin);
router.get('/configs', authenticateAdmin, listConfigs);
router.get('/configs/:id', authenticateAdmin, getConfig);
router.post('/configs', authenticateAdmin, createConfig);
router.put('/configs/:id', authenticateAdmin, updateConfig);
router.delete('/configs/:id', authenticateAdmin, deleteConfig);
router.get('/transactions/:id', authenticateAdmin, getTransactionWithItems);
router.post('/overtimes', authenticateAdmin, createOvertime);
router.get('/overtimes', authenticateAdmin, listOvertimes);
router.get('/overtimes/:id', authenticateAdmin, getOvertime);
router.put('/overtimes/:id', authenticateAdmin, updateOvertime);
router.delete('/overtimes/:id', authenticateAdmin, deleteOvertime);

export default router;

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
    deleteOvertime,
    getCashierDropdown
} from '../controllers/admin.controller';
import { authenticateAdmin } from '../middlewares/auth.middleware';

const router = Router();

router.post('/login/admin', adminLogin);
router.get('/configs', authenticateAdmin, listConfigs);
router.get('/configs/:config_uid', authenticateAdmin, getConfig);
router.post('/configs', authenticateAdmin, createConfig);
router.put('/configs/:config_uid', authenticateAdmin, updateConfig);
router.delete('/configs/:config_uid', authenticateAdmin, deleteConfig);
router.get('/transactions-with-item', authenticateAdmin, getTransactionWithItems);
router.get('/cashier/dropdown', authenticateAdmin, getCashierDropdown);
router.post('/overtimes', authenticateAdmin, createOvertime);
router.get('/overtimes', authenticateAdmin, listOvertimes);
router.get('/overtimes/:overtime_assigment_uid', authenticateAdmin, getOvertime);
router.put('/overtimes/:overtime_assigment_uid', authenticateAdmin, updateOvertime);
router.delete('/overtimes/:overtime_assigment_uid', authenticateAdmin, deleteOvertime);

export default router;

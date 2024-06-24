// src/routes/adminRoutes.ts
import { Router } from 'express';
import { adminLogin, getConfigs } from '../controllers/admin.controller';
import { authenticateAdmin } from '../middlewares/auth.middleware';

const router = Router();

router.post('/login/admin', authenticateAdmin, adminLogin);
router.get('/configs', authenticateAdmin, getConfigs);
// Implement other routes for configs, transactions, overtimes...

export default router;

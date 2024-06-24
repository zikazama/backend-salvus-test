// src/routes/adminRoutes.ts
import { Router } from 'express';
import { adminLogin, getConfigs } from '../controllers/admin.controller';

const router = Router();

router.post('/login/admin', adminLogin);
router.get('/configs', getConfigs);
// Implement other routes for configs, transactions, overtimes...

export default router;


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
} from '../controllers/cashier.controller';
import { Router } from 'express';
import { authenticateCashier } from '../middlewares/auth.middleware';

const router = Router();

router.post('/login', login);
router.get('/dashboard', authenticateCashier, dashboard);
router.post('/transactions', authenticateCashier, createTransaction);
router.get('/transactions', authenticateCashier, listTransactions);
router.get('/transactions/:id', authenticateCashier, getTransaction);
router.put('/transactions/:id', authenticateCashier, updateTransaction);
router.delete('/transactions/:id', authenticateCashier, deleteTransaction);
router.post('/transaction-items', authenticateCashier, createTransactionItem);
router.get('/transaction-items', authenticateCashier, listTransactionItems);
router.get('/transaction-items/:id', authenticateCashier, getTransactionItem);
router.put('/transaction-items/:id', authenticateCashier, updateTransactionItem);
router.delete('/transaction-items/:id', authenticateCashier, deleteTransactionItem);

export default router;

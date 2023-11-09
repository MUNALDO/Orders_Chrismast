import express from 'express';
import { exportOrderToExcel, orderForm } from '../controllers/OrderController.js';

const router = express.Router();

router.post('/orderForm', orderForm);
router.post('/export-xlsx', exportOrderToExcel);

export default router;
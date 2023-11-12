import express from 'express';
import { exportOrdersToExcel, getAllOrder, orderForm } from '../controllers/Order.js';

const router = express.Router();

router.post('/orderForm', orderForm);
// router.post('/export-xlsx-byId', exportOrderToExcelById);
router.post('/export-xlsx', exportOrdersToExcel);
router.get('/get', getAllOrder);

export default router;
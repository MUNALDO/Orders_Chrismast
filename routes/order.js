import express from 'express';
import {
    exportOrdersToExcel, exportOrderToExcelById,
    getAllOrder, orderForm
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/orderForm', orderForm);
router.post('/export-xlsx-byId', exportOrderToExcelById);
router.post('/export-xlsx', exportOrdersToExcel);
router.get('/get', getAllOrder);

export default router;
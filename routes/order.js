import express from 'express';
import { exportOrdersToExcel, getAllOrder, orderForm } from '../controllers/Order.js';

const router = express.Router();

router.post('/orderForm', orderForm);
// router.post('/export-xlsx-byId', exportOrderToExcelById);
router.post('/export-xlsx', exportOrdersToExcel);
router.get('/get', getAllOrder);
router.get('/home', (req, res) => {
        res.status(200).json('Welcome, your app is working well');
      })

export default router;
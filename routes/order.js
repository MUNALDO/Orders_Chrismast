import express from 'express';
import { orderForm } from '../controllers/OrderController.js';

const router = express.Router();

router.post('/orderForm', orderForm);

export default router;
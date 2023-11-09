import { CREATED, NOT_FOUND, SYSTEM_ERROR } from "../constant/HttpStatus.js";
import orderSchema from "../models/orderSchema.js";
import sendEmail from "./MailSending.js";
import dotenv from 'dotenv';
import ExcelJS from 'exceljs';
import fs from 'fs';

dotenv.config();

export const orderForm = async (req, res, next) => {
    const { pick_up_place, pick_up_date, products, first_name, last_name,
        email, phone_number, zip_code, city, street } = req.body;

    try {
        const newOrder = new orderSchema({
            pick_up_place: pick_up_place,
            pick_up_date: pick_up_date,
            products: products,
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number,
            zip_code: zip_code,
            city: city,
            street: street
        })
        const createOrder = await newOrder.save();
        const emailSubject = "Order Recorded";
        const emailContent = `Dear ${first_name} ${last_name},
                        \n\nYour order has been recorded.
                        \n\nPlease wait for several days. We will contact with you to...
                        \n\nThank you for choosing our service.`;
        sendEmail(email, process.env.MAIL_ADDRESS, emailSubject, emailContent);
        res.status(CREATED).json(createOrder);
    } catch (err) {
        next(err);
    }
};

export const exportOrderToExcel = async (req, res) => {
    const orderId = req.query.orderId; // Assuming you pass the order ID as a query parameter

    try {
        // Fetch the specific order data
        const order = await orderSchema.findById(orderId);

        if (!order) {
            return res.status(NOT_FOUND).json({ error: "Order not found" });
        }

        // Define the file name
        const fileName = `order_${orderId}.xlsx`;

        // Create a new Excel workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Order');

        // Define the columns for the Excel sheet
        const columns = [
            { header: 'Pick Up Place', key: 'pick_up_place', width: 15 },
            { header: 'Pick Up Date', key: 'pick_up_date', width: 15 },
            { header: 'Products', key: 'products', width: 50 },
            { header: 'First Name', key: 'first_name', width: 15 },
            { header: 'Last Name', key: 'last_name', width: 15 },
            { header: 'Email', key: 'email', width: 20 },
            { header: 'Phone Number', key: 'phone_number', width: 15 },
            { header: 'Zip Code', key: 'zip_code', width: 15 },
            { header: 'City', key: 'city', width: 15 },
            { header: 'Street', key: 'street', width: 15 },
        ];

        // Set columns for the Excel sheet
        worksheet.columns = columns;

        const productsString = order.products.map(product => `${product.product_name}: ${product.product_quantity}`).join(', ');

        // Populate the worksheet with data
        const rowData = {
            pick_up_place: order.pick_up_place,
            pick_up_date: order.pick_up_date,
            products: productsString,
            first_name: order.first_name,
            last_name: order.last_name,
            email: order.email,
            phone_number: order.phone_number,
            zip_code: order.zip_code,
            city: order.city,
            street: order.street,
        };
        worksheet.addRow(rowData);


        // Generate the Excel file in memory
        const buffer = await workbook.xlsx.writeBuffer();

        // Save the buffer to the file path
        try {
            fs.writeFileSync(fileName, buffer);
            console.log(`Excel file saved to ${fileName}`);
        } catch (error) {
            console.error('Error saving the Excel file:', error);
        }

        // Set content type and attachment header with the generated file name
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        // Send the buffer as the response
        res.send(buffer);
    } catch (error) {
        console.error('Error exporting Excel:', error);
        return res.status(SYSTEM_ERROR).json({ error: 'Internal server error' });
    }
};


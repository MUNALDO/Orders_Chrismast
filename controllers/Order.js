import { CREATED, NOT_FOUND, OK, SYSTEM_ERROR } from "../constant/HttpStatus.js";
import order from "../models/order.js";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import ExcelJS from 'exceljs';

dotenv.config();

export const orderForm = async (req, res, next) => {
    const {
        pick_up_place, pick_up_date, products, first_name, last_name,
        email, phone_number, zip_code, city, street
    } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_ADDRESS,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        // Generate a random number between 1 and 100000
        const randomNumber = Math.floor(Math.random() * 100000) + 1;

        const emailSubject = `CÔCÔ #${randomNumber}`;
        const emailContent = `<div style="text-align: center; font-family: 'Dancing Script', cursive; font-size: 24px;">
                                <p>CÔCÔ</p>
                             </div>
                             <div style="text-align: center;">
                                <p>0911 80195994</p>
                             </div>
                              <p>Hi ${first_name} ${last_name},</p>
                              vielen Dank für deine Bestellung. Wir prüfen intern die Richtigkeit deiner Bestellung und
                              werden dich so schnell wie möglich über den aktuellen Status informieren. Unten siehst du
                              zur Kontrolle eine Zusammenfassung deiner Bestellung.</p>
                              ${generateProductTable(products)}
                              <p>Bitte beachte auch unsere <a href="https://coco.lieferbude.de/static/pdf/terms_and_conditions.3f0f42936d6d.pdf">AGBs</a> & <a href="https://coco.lieferbude.de/static/pdf/privacy_policy.adb8727a38b1.pdf">Datenschutz</a> wie auch die</p>
                              <p style="white-space: pre-line;">Schöne Grüße,<br>dein CÔCÔ-Team</p>`;


        const mailOptions = {
            from: process.env.MAIL_ADDRESS,
            to: email,
            subject: emailSubject,
            html: emailContent,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        const newOrder = new order({
            pick_up_place,
            pick_up_date,
            products,
            first_name,
            last_name,
            email,
            phone_number,
            zip_code,
            city,
            street
        });

        const createOrder = await newOrder.save();
        res.status(CREATED).json(createOrder);
    } catch (err) {
        next(err);
    }
};

// Function to generate a table with two columns for product names and quantities
const generateProductTable = (products) => {
    const tableRows = products.map(product => `<tr><td>${product.product_name}</td><td>${product.product_quantity}</td></tr>`);
    return `<table style="border-collapse: collapse; width: 100%; border: 1px solid #ddd;"><tr><th style="border: 1px solid #ddd; padding: 8px;">Product name</th><th style="border: 1px solid #ddd; padding: 8px;">Product quantity</th></tr>${tableRows.join('')}</table>`;
};

// export const exportOrderToExcelById = async (req, res) => {
//     const orderId = req.query.orderId;

//     try {
//         const order = await orderSchema.findById(orderId);

//         if (!order) {
//             return res.status(NOT_FOUND).json({ error: "Order not found" });
//         }

//         const fileName = `order_${orderId}.xlsx`;

//         const workbook = new ExcelJS.Workbook();
//         const worksheet = workbook.addWorksheet('Order');

//         // Define the columns for the Excel sheet
//         const columns = [
//             { header: 'Pick Up Place', key: 'pick_up_place', width: 15 },
//             { header: 'Pick Up Date', key: 'pick_up_date', width: 15 },
//             { header: 'Products', key: 'products', width: 50 },
//             { header: 'First Name', key: 'first_name', width: 15 },
//             { header: 'Last Name', key: 'last_name', width: 15 },
//             { header: 'Email', key: 'email', width: 20 },
//             { header: 'Phone Number', key: 'phone_number', width: 15 },
//             { header: 'Zip Code', key: 'zip_code', width: 15 },
//             { header: 'City', key: 'city', width: 15 },
//             { header: 'Street', key: 'street', width: 15 },
//         ];

//         // Set columns for the Excel sheet
//         worksheet.columns = columns;

//         const productsString = order.products.map(product => `${product.product_name}: ${product.product_quantity}`).join(', ');

//         // Populate the worksheet with data
//         const rowData = {
//             pick_up_place: order.pick_up_place,
//             pick_up_date: order.pick_up_date,
//             products: productsString,
//             first_name: order.first_name,
//             last_name: order.last_name,
//             email: order.email,
//             phone_number: order.phone_number,
//             zip_code: order.zip_code,
//             city: order.city,
//             street: order.street,
//         };
//         worksheet.addRow(rowData);


//         // Generate the Excel file in memory
//         const buffer = await workbook.xlsx.writeBuffer();

//         // Save the buffer to the file path
//         try {
//             fs.writeFileSync(fileName, buffer);
//             console.log(`Excel file saved to ${fileName}`);
//         } catch (error) {
//             console.error('Error saving the Excel file:', error);
//         }

//         // Set content type and attachment header with the generated file name
//         res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//         res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
//         // Send the buffer as the response
//         res.send(buffer);
//     } catch (error) {
//         console.error('Error exporting Excel:', error);
//         return res.status(SYSTEM_ERROR).json({ error: 'Internal server error' });
//     }
// };

export const exportOrdersToExcel = async (req, res) => {
    try {
        // Fetch orders data
        const orders = await order.find();

        if (!orders || orders.length === 0) {
            return res.status(NOT_FOUND).json({ error: "No orders found" });
        }

        // Create a new Excel workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Orders');

        // Define the columns for the Excel sheet
        const columns = [
            { header: 'Pick Up Place', key: 'pick_up_place', width: 15 },
            { header: 'Pick Up Date', key: 'pick_up_date', width: 15 },
            { header: 'Product Name', key: 'product_name', width: 15 },
            { header: 'Product Quantity', key: 'product_quantity', width: 15 },
            { header: 'First Name', key: 'first_name', width: 15 },
            { header: 'Last Name', key: 'last_name', width: 15 },
            { header: 'Email', key: 'email', width: 20 },
            { header: 'Phone Number', key: 'phone_number', width: 15 },
            { header: 'Zip Code', key: 'zip_code', width: 15 },
            { header: 'City', key: 'city', width: 15 },
            { header: 'Street', key: 'street', width: 15 },
        ];

        worksheet.columns = columns;

        orders.forEach(order => {
            order.products.forEach(product => {
                worksheet.addRow({
                    pick_up_place: order.pick_up_place,
                    pick_up_date: order.pick_up_date,
                    product_name: product.product_name,
                    product_quantity: product.product_quantity,
                    first_name: order.first_name,
                    last_name: order.last_name,
                    email: order.email,
                    phone_number: order.phone_number,
                    zip_code: order.zip_code,
                    city: order.city,
                    street: order.street,
                });
            });
        });

        // Generate the Excel file in memory
        const buffer = await workbook.xlsx.writeBuffer();

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=orders.xlsx');

        // Send the buffer as the response
        res.send(buffer);

    } catch (error) {
        console.error('Error exporting Excel:', error);
        return res.status(SYSTEM_ERROR).json({ error: 'Internal server error' });
    }
};

export const getAllOrder = async (req, res, next) => {
    try {
        const orders = await order.find();
        console.log(orders);
        res.status(OK).json(orders);
    } catch (err) {
        next(err);
    }
};



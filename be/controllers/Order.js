import { BAD_REQUEST, CREATED, NOT_FOUND, OK, SYSTEM_ERROR } from "../constant/HttpStatus.js";
import order from "../models/order.js";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import ExcelJS from 'exceljs';

dotenv.config();

export const orderForm = async (req, res, next) => {
    const {
        pick_up_place, pick_up_time, products, first_name, last_name,
        email, phone_number
    } = req.body;

    const list_discount_code = ['NXT123', 'LTTH456', 'KTP789', 'NDQ10'];

    try {
        // Generate a random number between 1 and 100000
        const randomNumber = Math.floor(Math.random() * 100000) + 1;

        const newOrder = new order({
            order_number: randomNumber,
            pick_up_place,
            pick_up_time,
            products,
            first_name,
            last_name,
            email,
            phone_number,
            create_at: new Date()
        });

        // console.log(newOrder);

        newOrder.products.total = newOrder.products.product_value * newOrder.products.product_quantity;

        const createdAtFromDb = newOrder.create_at;
        const newcreatedAt = `${createdAtFromDb.toLocaleDateString("de-DE", { timeZone: "Europe/Berlin", })}-${createdAtFromDb.toLocaleTimeString("de-DE", { timeZone: "Europe/Berlin", })}`;
        // console.log(newcreatedAt);

        const createOrder = await newOrder.save();
        createOrder.create_at_string = newcreatedAt;

        await createOrder.save();


        if (list_discount_code.includes(createOrder.products.discount_code)) {
            createOrder.products.total = createOrder.products.total - (20 * createOrder.products.product_quantity);
            console.log('Code is valid. Discount applied.');
            await createOrder.save();

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MAIL_ADDRESS,
                    pass: process.env.MAIL_PASSWORD,
                },
            });

            const emailSubject = `CÔCÔ #${newOrder.order_number}`;
            const tableHtml = generateProductTableForDiscount(newOrder.products);

            const emailContent = `
                                    <div style="text-align: center; font-size: 20px;">
                                    <img src="https://i.ibb.co/hZ7gTsq/0dz6syd7.png" alt="coco_logo" style="width: 80px; height: 150px;">
                                        <p>E-Mail: service@the-coco.de</p>
                                    </div>
                                    <div style="font-size: 20px;">
                                        <p>Hi ${first_name} ${last_name},</p>
                                        <br></br>
                                        <p>vielen Dank für deine Bestellung. Wir prüfen intern die Richtigkeit deiner Bestellung und
                                        werden dich so schnell wie möglich über den aktuellen Status informieren. Unten siehst du
                                        zur Kontrolle eine Zusammenfassung deiner Bestellung.</p>
                                        ${tableHtml}
                                        <p>Bitte beachte auch unsere 
                                        <a href="https://coco.lieferbude.de/static/pdf/terms_and_conditions.3f0f42936d6d.pdf">AGBs</a> 
                                        wie auch die <a href="https://coco.lieferbude.de/static/pdf/privacy_policy.adb8727a38b1.pdf">Datenschutzrichtlinien</a></p>
                                    </div>
                                    <div style="font-family: 'Dancing Script', cursive; font-size: 16px;">
                                        <br></br>
                                        <b>Umtausch und Stornierungen</b>
                                    </div>
                                    <div style="font-size: 16px;">
                                        <p>Wenn Sie Ihre Bestellung stornieren oder ändern möchten, wenden Sie sich bitte baldmöglichst 
                                        an uns unter 0911 23735510, oder schicken Sie eine E-Mail an service@the-coco.de Wir werden uns nach besten Kräften bemühen, 
                                        Ihrem Ersuchen nachzukommen. Allerdings können wir nicht garantieren, dass ein Einkauf storniert 
                                        oder geändert werden kann, wenn eine Bestellung erst einmal aufgegeben wurde.</p>
                                    </div>
                                      <br></br>
                                      <br></br>
                                    <div style="font-size: 20px;">
                                      <p style="white-space: pre-line;">Schöne Grüße,<br>dein CÔCÔ-Team</p>
                                    </div>`;

            const mailOptions = {
                from: '"No Reply" <no-reply@gmail.com>',
                to: email,
                subject: emailSubject,
                html: emailContent,
            };

            // Send email
            await transporter.sendMail(mailOptions);
            return res.status(CREATED).json(createOrder);
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_ADDRESS,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const emailSubject = `CÔCÔ #${newOrder.order_number}`;
        const tableHtml = generateProductTable(newOrder.products);

        const emailContent = `
                            <div style="text-align: center; font-size: 20px;">
                            <img src="https://i.ibb.co/hZ7gTsq/0dz6syd7.png" alt="coco_logo" style="width: 80px; height: 150px;">
                                <p>E-Mail: service@the-coco.de</p>
                            </div>
                            <div style="font-size: 20px;">
                                <p>Hi ${first_name} ${last_name},</p>
                                <br></br>
                                <p>vielen Dank für deine Bestellung. Wir prüfen intern die Richtigkeit deiner Bestellung und
                                werden dich so schnell wie möglich über den aktuellen Status informieren. Unten siehst du
                                zur Kontrolle eine Zusammenfassung deiner Bestellung.</p>
                                ${tableHtml}
                                <p>Bitte beachte auch unsere 
                                <a href="https://coco.lieferbude.de/static/pdf/terms_and_conditions.3f0f42936d6d.pdf">AGBs</a> 
                                wie auch die <a href="https://coco.lieferbude.de/static/pdf/privacy_policy.adb8727a38b1.pdf">Datenschutzrichtlinien</a></p>
                            </div>
                            <div style="font-family: 'Dancing Script', cursive; font-size: 16px;">
                                <br></br>
                                <b>Umtausch und Stornierungen</b>
                            </div>
                            <div style="font-size: 16px;">
                                <p>Wenn Sie Ihre Bestellung stornieren oder ändern möchten, wenden Sie sich bitte baldmöglichst 
                                an uns unter 0911 23735510, oder schicken Sie eine E-Mail an service@the-coco.de Wir werden uns nach besten Kräften bemühen, 
                                Ihrem Ersuchen nachzukommen. Allerdings können wir nicht garantieren, dass ein Einkauf storniert 
                                oder geändert werden kann, wenn eine Bestellung erst einmal aufgegeben wurde.</p>
                            </div>
                              <br></br>
                              <br></br>
                            <div style="font-size: 20px;">
                              <p style="white-space: pre-line;">Schöne Grüße,<br>dein CÔCÔ-Team</p>
                            </div>`;

        const mailOptions = {
            from: '"No Reply" <no-reply@gmail.com>',
            to: email,
            subject: emailSubject,
            html: emailContent,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        return res.status(CREATED).json(createOrder);
    } catch (err) {
        next(err);
    }
};

// Function to generate a table with two columns for product names and quantities
const generateProductTable = (products) => {
    const tableRows = `
        <tr>
            <td style="text-align: center;">${products.product_name}</td>
            <td style="text-align: center;">${products.product_quantity}x</td>
            <td style="text-align: center;">${products.product_value}€</td>
            <td style="text-align: center;">${products.total}€</td>
        </tr>
    `;

    const tableHtml = `<table style="border-collapse: collapse; width: 100%; border: 1px solid #ddd;">
        <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Produkt</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Menge</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Stückpreis</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Gesamt</th>
        </tr>
        ${tableRows}
    </table>`;

    const mwstValue = 0.07;
    const gesamtValue = products.total;
    const nettoValue = (gesamtValue / (1 + mwstValue)).toFixed(2);
    const mwst = (gesamtValue - nettoValue).toFixed(2);

    // Additional rows without borders
    const additionalRows = `
        <tr>
            <td colspan="2"></td>
            <td style="text-align: center;">MwSt.7.00%</td>
            <td style="text-align: right;">${mwst}€</td>
        </tr>
        <tr>
            <td colspan="2"></td>
            <td style="text-align: center;">Netto</td>
            <td style="text-align: right;">${nettoValue}€</td>
        </tr>
        <tr>
            <td colspan="2"></td>
            <td style="text-align: center;">Gesamt</td>
            <td style="text-align: right;">${gesamtValue}€</td>
        </tr>
    `;

    return tableHtml + additionalRows;
};

const generateProductTableForDiscount = (products) => {
    const tableRows = `
        <tr>
            <td style="text-align: center;">${products.product_name}</td>
            <td style="text-align: center;">${products.product_quantity}x</td>
            <td style="text-align: center;">${products.product_value}€</td>
            <td style="text-align: center;">${products.total}€</td>
        </tr>
         <tr>
            <td style="text-align: center;">Rabatt</td>
            <td style="text-align: center;"></td>
            <td style="text-align: center;"></td>
            <td style="text-align: center;">- ${20 * products.product_quantity}€</td>
        </tr>
    `;

    const tableHtml = `<table style="border-collapse: collapse; width: 100%; border: 1px solid #ddd;">
        <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Produkt</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Menge</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Stückpreis</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Gesamt</th>
        </tr>
        ${tableRows}
    </table>`;

    const mwstValue = 0.07;
    const gesamtValue = products.total - (20 * products.product_quantity);
    const nettoValue = (gesamtValue / (1 + mwstValue)).toFixed(2);
    const mwst = (gesamtValue - nettoValue).toFixed(2);

    // Additional rows without borders
    const additionalRows = `
        <tr>
            <td colspan="2"></td>
            <td style="text-align: center;">MwSt.7.00%</td>
            <td style="text-align: right;">${mwst}€</td>
        </tr>
        <tr>
            <td colspan="2"></td>
            <td style="text-align: center;">Netto</td>
            <td style="text-align: right;">${nettoValue}€</td>
        </tr>
        <tr>
            <td colspan="2"></td>
            <td style="text-align: center;">Gesamt</td>
            <td style="text-align: right;">${gesamtValue}€</td>
        </tr>
    `;

    return tableHtml + additionalRows;
};

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
            { header: 'Order Number', key: 'order_number', width: 15 },
            { header: 'Pick Up Place', key: 'pick_up_place', width: 15 },
            { header: 'Pick Up Time', key: 'pick_up_time', width: 15 },
            { header: 'Product Name', key: 'product_name', width: 15 },
            { header: 'Product Quantity', key: 'product_quantity', width: 15 },
            { header: 'Product Value', key: 'product_value', width: 15 },
            { header: 'First Name', key: 'first_name', width: 15 },
            { header: 'Last Name', key: 'last_name', width: 15 },
            { header: 'Email', key: 'email', width: 20 },
            { header: 'Phone Number', key: 'phone_number', width: 15 },
            { header: 'Create At', key: 'create_at_string', width: 15 },
        ];

        worksheet.columns = columns;

        orders.forEach(order => {
            const product = order.products; // Assuming there's only one product per order
            worksheet.addRow({
                order_number: order.order_number,
                pick_up_place: order.pick_up_place,
                pick_up_time: order.pick_up_time,
                product_name: product.product_name,
                product_quantity: product.product_quantity,
                product_value: product.product_value,
                first_name: order.first_name,
                last_name: order.last_name,
                email: order.email,
                phone_number: order.phone_number,
                create_at_string: order.create_at_string,
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



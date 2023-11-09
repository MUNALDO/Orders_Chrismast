import { CREATED } from "../constant/HttpStatus.js";
import orderSchema from "../models/orderSchema.js";
import sendEmail from "./MailSending.js";
import dotenv from 'dotenv';

dotenv.config();

export const orderForm = async (req, res, next) => {
    const { pick_up_place, pick_up_date, product_name,
        product_quantity, first_name, last_name,
        email, phone_number, zip_code, city, street } = req.body;

    try {
        const newOrder = new orderSchema({
            pick_up_place: pick_up_place,
            pick_up_date: pick_up_date,
            products: [
                {
                    product_name: product_name,
                    product_quantity: product_quantity,
                }
            ],
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone_number: phone_number,
            zip_code: zip_code,
            city: city,
            street: street
        })
        await newOrder.save();
        const emailSubject = "Order Recorded";
        const emailContent = `Dear ${first_name} ${last_name},
                        \n\nYour order has been recorded.
                        \n\nPlease wait for several days. We will contact with you to...
                        \n\nThank you for choosing our service.`;
        sendEmail(email, process.env.MAIL_ADDRESS, emailSubject, emailContent);
        res.status(CREATED).json(newOrder);
    } catch (err) {
        next(err);
    }
};
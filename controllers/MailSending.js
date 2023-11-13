import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendEmail = (to, cc, subject, text) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail({
      from: process.env.MAIL_ADDRESS,
      to,
      cc,
      subject,
      text,
    }, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        reject(error);
      } else {
        console.log('Email sent:', info.messageId);
        resolve(info);
      }
    });
  });
};


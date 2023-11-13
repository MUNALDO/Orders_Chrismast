import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { FORBIDDEN, OK, SYSTEM_ERROR } from './constant/HttpStatus.js';
import cors from 'cors';
import orderRoute from './routes/order.js';

const app = express();
dotenv.config();
mongoose.set('strictQuery', false);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected");
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on('disconnected', () => {
    console.log("Database disconnected");
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/order", orderRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || SYSTEM_ERROR;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});

// app.get('/home', (req, res) => {
//     res.status(OK).json('Welcome, your app is working well');
//   })

app.listen(8080, () => {
    connect();
    console.log('Server is running on port 8080');
});

// startApp();

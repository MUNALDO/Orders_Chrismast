import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        pick_up_place: {
            type: String,
            require: true
        },
        pick_up_date: {
            type: String,
            require: true
        },
        products: [
            {
                product_name: {
                    type: String,
                    require: true
                },
                product_quantity: {
                    type: Number,
                    require: true
                }
            }
        ],
        first_name: {
            type: String,
            require: true
        },
        last_name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        phone_number: {
            type: String,
            require: true
        },
        zip_code: {
            type: Number,
            require: true
        },
        city: {
            type: String,
            require: true
        },
        street: {
            type: String,
            require: true
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
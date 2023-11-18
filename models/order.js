import mongoose from "mongoose";

const order = new mongoose.Schema(
    {
        order_number: {
            type: Number,
        },
        pick_up_place: {
            type: String,
            require: true
        },
        pick_up_time: {
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
                },
                product_value: {
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
        }
    },
    { timestamps: true }
);

export default mongoose.model("Order", order);

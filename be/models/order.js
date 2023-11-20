import mongoose from "mongoose";

const order = new mongoose.Schema(
    {
        order_number: {
            type: Number
        },
        pick_up_place: {
            type: String,
            required: true
        },
        pick_up_time: {
            type: String,
            required: true
        },
        products: [
            {
                product_name: {
                    type: String,
                    required: true
                },
                product_quantity: {
                    type: Number,
                    required: true
                },
                product_value: {
                    type: Number,
                    default: 148
                }
            }
        ],
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone_number: {
            type: String,
            required: true
        },
        create_at: {
            type: Date
        },
        create_at_string: {
            type: String
        }
    },
    { timestamps: true }
);

export default mongoose.model("Order", order);

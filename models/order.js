import mongoose from "mongoose";

const order = new mongoose.Schema(
    {
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
                    default: 149
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
        }
    },
    { timestamps: true }
);

export default mongoose.model("Order", order);

import { Schema, model } from "mongoose";

const cloudSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    customers: {
        type: Number,
        required: true,
    },
});

export default model('Cloud', cloudSchema);

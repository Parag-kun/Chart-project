import { Schema, model } from "mongoose";

const stockSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
});

export default model('Stock', stockSchema);

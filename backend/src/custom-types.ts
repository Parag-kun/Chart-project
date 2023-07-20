import { Types } from "mongoose";

export type CloudBody = {
    _id?: Types.ObjectId;
    name: string;
    customers: number;
};

export type StockBody = {
    _id: Types.ObjectId;
    name: string;
    value: number;
};

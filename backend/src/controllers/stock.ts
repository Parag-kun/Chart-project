import { Request, Response } from "express";
import Stock from "../models/stock";
import { StockBody } from "../custom-types";

export const getStockData = async (_: Request, res: Response) => {
    try {
        const data = await Stock.find({});
    
        return res.status(200).json({ success: true, data });
    } catch (err) {
        return res.status(500).json({ success: false, error: (err as Error).message });
    }
};

export const addStock = async (req: Request, res: Response) => {
    try {
        const stock = req.body as StockBody;
        const data = await Stock.create(stock);
    
        return res.status(200).json({ success: true, data });
    } catch (err) {
        return res.status(500).json({ success: false, error: (err as Error).message });
    }
};

export const updateStockData = async () => {
    const stocks = await Stock.find({});
    const stocksAsync = stocks.map(stock => new Promise<StockBody>(resolve => {
        const newValue = stock.value + Math.floor(((Math.random() - 0.5) * 100));
        Stock
            .findByIdAndUpdate(stock._id, { value: newValue}, { new: true })
            .then(newStock => resolve(newStock!));
    }));
    return Promise.all(stocksAsync);
};

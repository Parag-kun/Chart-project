import { Router } from "express";
import { addStock, getStockData } from "../controllers/stock";

const router = Router();

router.get('/', getStockData);
router.post('/', addStock);

export default router;

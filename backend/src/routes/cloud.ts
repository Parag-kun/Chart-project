import { Router } from "express";
import { addCloud, getCloudData } from "../controllers/cloud";

const router = Router();

router.get('/', getCloudData);
router.post('/', addCloud);

export default router;

import { Request, Response } from "express";
import Cloud from "../models/cloud";
import { CloudBody } from "../custom-types";

export const getCloudData = async (_: Request, res: Response) => {
    try {
        const data = await Cloud.find({});
    
        return res.status(200).json({ success: true, data });
    } catch (err) {
        return res.status(500).json({ success: false, error: (err as Error).message });
    }
};

export const addCloud = async (req: Request, res: Response) => {
    try {
        const cloud = req.body as CloudBody;
        const data = await Cloud.create(cloud);
    
        return res.status(200).json({ success: true, data });
    } catch (err) {
        return res.status(500).json({ success: false, error: (err as Error).message });
    }
};

export const updateCloudData = async () => {
    const clouds = await Cloud.find({});
    const cloudsAsync = clouds.map(cloud => new Promise<CloudBody>(resolve => {
        const newValue = cloud.customers + Math.floor(((Math.random() - 0.5) * 100));
        Cloud
            .findByIdAndUpdate(cloud._id, { customers: newValue}, { new: true })
            .then(newCloud => resolve(newCloud!));
    }));
    return Promise.all(cloudsAsync);
};

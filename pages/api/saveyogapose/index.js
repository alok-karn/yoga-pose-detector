import { mongooseConnect } from "@/lib/mongoose";
import { YogaPose } from "@/models/YogaPose";

const { YogaData } = require("@/data/constants");

export default async function handler(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === "POST") {
        try {
            const savedYogaPoses = await Promise.all(
                YogaData.map(async (poseData) => {
                    const yogaPose = new YogaPose(poseData);
                    return await yogaPose.save();
                })
            );

            res.status(201).json({
                status: true,
                data: savedYogaPoses,
            });
        } catch (error) {
            res.status(400).json({
                status: false,
                message: `Error saving yoga poses! ${error.message}`,
            });
        }
    }
}

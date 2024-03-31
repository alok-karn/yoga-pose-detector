import { mongooseConnect } from "@/lib/mongoose";
import { YogaPose } from "@/models/YogaPose";

export default async function handler(req, res) {
    const { method } = req;

    if (method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }
    const { poseName } = req.body;

    try {
        await mongooseConnect();
        const pose = await YogaPose.findOneAndUpdate(
            {
                name: poseName,
            },
            {
                status: true,
            }
        );

        if (!pose) {
            return res.status(404).json({
                success: false,
                message: "Yoga Pose not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Yoga Pose status updated successfully",
        });
    } catch (error) {
        console.error("Error updating yoga pose status: ", error);
        return res.status(500).json({
            messgage: "Internal Server Error",
        });
    }
}

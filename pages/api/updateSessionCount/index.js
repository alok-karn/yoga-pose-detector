import { mongooseConnect } from "@/lib/mongoose";
import { YogaPose } from "@/models/YogaPose";

export default async function handler(req, res) {
    const { method } = req.body;

    if (method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    const { poseName } = req.body;

    try {
        await mongooseConnect();
        const updatedPose = await YogaPose.findOneAndUpdate(
            { name: poseName },
            { $inc: { sessionCount: 1 } },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: "Session count updated successfully",
            data: updatedPose,
        });
    } catch (error) {
        console.error("Error incrementing session count:", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

import { mongooseConnect } from "@/lib/mongoose";
import { YogaPose } from "@/models/YogaPose";

export default async function handler(req, res) {
    const { method } = req;

    if (method === "GET") {
        try {
            await mongooseConnect();
            const poses = await YogaPose.find();
            res.status(200).json({
                success: true,
                data: poses,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    } else {
        res.status(405).json({
            success: false,
            message: "Method Not Allowed",
        });
    }
}

// Import necessary modules and models
import { mongooseConnect } from "@/lib/mongoose";
import { userActivity } from "@/models/userActivity";

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        // Fetch all user activity documents
        await mongooseConnect();
        const activityData = await userActivity.find();

        res.status(200).json({
            success: true,
            data: activityData,
        });
    } catch (error) {
        console.error("Error fetching user activity:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

import { mongooseConnect } from "@/lib/mongoose";
import { YogaPose } from "@/models/YogaPose";
import { userActivity } from "@/models/userActivity";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        // Fetch all YogaPose documents
        await mongooseConnect();
        const yogaPoses = await YogaPose.find();

        // Group YogaPose documents by day and calculate total session count
        const activityData = yogaPoses.reduce((acc, pose) => {
            // Extract day name from createdAt timestamp
            const createdAt = new Date(pose.createdAt);
            const day = getDayName(createdAt.getDay()); // Function to get day name
            // Increment total session count for the day
            acc[day] = (acc[day] || 0) + pose.sessionCount;
            return acc;
        }, {});

        // Update or create userActivity documents for each day
        await Promise.all(
            Object.keys(activityData).map(async (day) => {
                await userActivity.updateOne(
                    { day },
                    { $set: { day, totalSessionCount: activityData[day] } },
                    { upsert: true }
                );
            })
        );

        res.status(200).json({
            success: true,
            message: "User activity updated successfully",
        });
    } catch (error) {
        console.error("Error updating user activity:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

// Function to get day name from day index (0-6)
function getDayName(dayIndex) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[dayIndex];
}

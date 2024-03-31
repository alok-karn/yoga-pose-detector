import { mongooseConnect } from "@/lib/mongoose";
import { ScheduledExercise } from "@/models/ScheduledExercise";

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    if (method === "POST") {
        await mongooseConnect();
        const { asanaName, date, time } = req.body;

        try {
            const newExercise = new ScheduledExercise({
                asanaName,
                date,
                time,
            });
            const savedExercise = await newExercise.save();

            res.status(201).json({
                success: true,
                data: savedExercise,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: "Error in scheduling exercise",
            });
        }
    }

    if (method === "GET") {
        await mongooseConnect();

        try {
            const scheduledExercises = await ScheduledExercise.find();

            res.status(200).json({
                success: true,
                data: scheduledExercises,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: "Error retrieving scheduled exercises",
            });
        }
    }

    if (method === "DELETE") {
        await mongooseConnect();

        try {
            const deletedExercise = await ScheduledExercise.findByIdAndDelete(
                id
            );
            if (!deletedExercise) {
                return res.status(404).json({
                    success: false,
                    error: "Scheduled exercise not found",
                });
            }
            res.status(200).json({
                success: true,
                data: deletedExercise,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: "Error Deleting scheduled exercises",
            });
        }
    }
}

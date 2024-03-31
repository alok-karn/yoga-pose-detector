import mongoose, { Schema, model, models } from "mongoose";

const ScheduledExerciseSchema = new Schema(
    {
        asanaName: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const ScheduledExercise =
    models.ScheduledExercise ||
    model("ScheduledExercise", ScheduledExerciseSchema);

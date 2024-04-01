import mongoose, { Schema, model, models } from "mongoose";

const userActivitySchema = new Schema(
    {
        day: {
            type: String,
            required: true,
            unique: true,
        },
        totalSessionCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const userActivity =
    models.userActivity || model("userActivity", userActivitySchema);

import mongoose, { Schema, model, models } from "mongoose";

const YogaPoseSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["true", "false"],
        },
        sessionCount: {
            type: Number,
            required: true,
        },
        schedule: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

export const YogaPose = models.YogaPose || model("YogaPose", YogaPoseSchema);

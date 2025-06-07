import mongoose from "mongoose";

const TrainerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },   // Unique constraint
    phone: { type: String, required: true, unique: true },   // Unique constraint
    experience: { type: Number, required: true },
    skills: { type: [String], required: true },
    resume: { type: String },
    baseLocation: { type: String, required: true },
    linkedInProfile: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Trainer", TrainerSchema);
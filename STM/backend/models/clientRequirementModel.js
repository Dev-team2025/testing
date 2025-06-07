// models/clientRequirementModel.js
import mongoose from 'mongoose';

const clientRequirementSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    requirements: { type: String, required: true },
    modeOfTraining: { type: String, required: true },
    tentativeSchedule: { type: String, required: true },
    trainingDates: { type: String },
    numberOfBatches: { type: Number, default: 1 },
    numberOfParticipants: { type: Number, default: 1 },
    trainingLocation: { type: String },
    participantBackground: { type: String },
    labRequirement: { type: String },
    proposalStatus: { type: String, enum: ['pending', 'approved', 'inprogress', 'submitted', 'rejected', 'open', 'done'], default: 'pending' },
    proposalValue: { type: Number, default: 0 },
    remarks: { type: String },
    assignmentCode: { type: String, default: null }
}, { timestamps: true });

const ClientRequirement = mongoose.model('ClientRequirement', clientRequirementSchema);

export default ClientRequirement;

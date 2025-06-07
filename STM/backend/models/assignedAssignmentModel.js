import mongoose from 'mongoose';

const assignedAssignmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // same as ClientRequirement._id
    clientName: String,
    requirements: String,
    modeOfTraining: String,
    tentativeSchedule: String,
    trainingDates: String,
    numberOfBatches: Number,
    numberOfParticipants: Number,
    trainingLocation: String,
    participantBackground: String,
    labRequirement: String,
    proposalStatus: String,
    proposalValue: Number,
    remarks: String,
    assignmentCode: String,
}, { timestamps: true });

const AssignedAssignment = mongoose.model('AssignedAssignment', assignedAssignmentSchema);

export default AssignedAssignment;

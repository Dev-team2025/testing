import mongoose from 'mongoose';

const trainerResponseSchema = new mongoose.Schema({
    submittedBy: String,
    trainingName: String,
    contactNumber: String,
    email: String,
    preRequisites: String,
    schedule: String,
    programAgenda: String,
    executionApproach: String,
    labRequirements: String,
    caseStudies: String,
    expectedOutcome: String,
    deliverables: String,
    profileSummary: String,
    commercials: String,
    availableForScopingCall: String,
    availableForTrainingExecution: String,
}, { timestamps: true });

export default mongoose.model('TrainerResponse', trainerResponseSchema);

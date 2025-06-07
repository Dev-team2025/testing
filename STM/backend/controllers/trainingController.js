import Training from '../models/assignedAssignmentModel.js'

export const getAllTrainings = async (req, res) => {
    try {
        const trainings = await Training.find().sort({ trainingDates: 1, clientName: 1 });
        res.status(200).json(trainings);
    } catch (error) {
        console.error('Error fetching trainings:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
// import AssignedAssignment from '../models/assignedAssignmentModel.js';
import TrainerResponse from '../models/TrainerResponse.js';

export const getAssignedDetails = async (req, res) => {
    try {
        const assigned = await AssignedAssignment.find();
        const responses = await TrainerResponse.find();

        // You can merge both data based on assignmentCode or some linking field
        const combined = assigned.map(assign => {
            const response = responses.find(r => r.trainingName === assign.assignmentCode); // or use _id or other field
            return {
                ...assign._doc,
                trainerDetails: response || null
            };
        });

        res.status(200).json(combined);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching assigned details', error: error.message });
    }
};

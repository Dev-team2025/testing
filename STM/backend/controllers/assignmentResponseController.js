import mongoose from 'mongoose';
import AssignedAssignment from '../models/assignedAssignmentModel.js';
import TrainerResponse from '../models/TrainerResponse.js';
import ClientRequirement from '../models/clientRequirementModel.js'; // Add this import

export const getCombinedDetails = async (req, res) => {
    try {
        const data = await AssignedAssignment.aggregate([
            {
                $addFields: {
                    assignmentObjectId: { $toObjectId: "$assignmentCode" }
                }
            },
            {
                $lookup: {
                    from: 'trainerresponses',
                    localField: 'assignmentObjectId',
                    foreignField: '_id',
                    as: 'trainerResponse'
                }
            },
            {
                $unwind: "$trainerResponse"
            }
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getProposalDoneRequirements = async (req, res) => {
    try {
        const doneRequirements = await ClientRequirement.find({ proposalStatus: 'done' });
        res.status(200).json(doneRequirements);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
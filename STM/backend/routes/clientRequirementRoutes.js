import express from 'express';
import {
    createRequirement,
    getAllRequirements,
    getRequirementById,
    updateRequirement,
    deleteRequirement
} from '../controllers/clientRequirementController.js';

const router = express.Router();

router.post('/', createRequirement);
router.get('/', getAllRequirements);
router.get('/:id', getRequirementById);
router.put('/:id', updateRequirement); // updated controller handles AssignedAssignment upsert
router.delete('/:id', deleteRequirement);

export default router;

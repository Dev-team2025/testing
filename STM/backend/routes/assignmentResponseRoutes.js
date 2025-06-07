import express from 'express';
import { getCombinedDetails, getProposalDoneRequirements } from '../controllers/assignmentResponseController.js';

const router = express.Router();
router.get('/combined-details', getCombinedDetails);
router.get('/proposal-done', getProposalDoneRequirements); // This will be /api/combined/proposal-done
export default router;
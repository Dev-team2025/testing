import express from 'express';
import { getAllTrainings, getAssignedDetails } from '../controllers/trainingController.js';

const router = express.Router();

router.get('/', getAllTrainings);


router.get('/assigned-details', getAssignedDetails);

export default router;

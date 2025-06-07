import express from 'express';
import {
    createResponse,
    getAllResponses,
    getResponseById,
    updateResponse,
    deleteResponse
} from '../controllers/trainerResponseController.js';

const router = express.Router();

router.post('/', createResponse);
router.get('/', getAllResponses);
router.get('/:id', getResponseById);
router.put('/:id', updateResponse);
router.delete('/:id', deleteResponse);
// Express route in trainerResponseRoutes.js
router.get('/:id', async (req, res) => {
    try {
        const response = await TrainerResponse.findById(req.params.id);
        if (!response) return res.status(404).json({ message: 'Not found' });
        res.json(response);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
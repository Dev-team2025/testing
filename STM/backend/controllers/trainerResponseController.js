import TrainerResponse from '../models/TrainerResponse.js';

export const createResponse = async (req, res) => {
    try {
        const response = new TrainerResponse(req.body);
        const saved = await response.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getAllResponses = async (req, res) => {
    try {
        const responses = await TrainerResponse.find();
        res.json(responses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getResponseById = async (req, res) => {
    try {
        const response = await TrainerResponse.findById(req.params.id);
        if (!response) return res.status(404).json({ message: 'Not found' });
        res.json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateResponse = async (req, res) => {
    try {
        const updated = await TrainerResponse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteResponse = async (req, res) => {
    try {
        const deleted = await TrainerResponse.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

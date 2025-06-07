import Trainer from '../models/Trainer.js';

export const addTrainer = async (req, res) => {
    const { name, email, phone, experience, skills, baseLocation, linkedInProfile } = req.body;
    const resume = req.file?.filename;

    try {
        // Check if a trainer with the same email or phone number exists
        const existingTrainer = await Trainer.findOne({ $or: [{ email }, { phone }] });
        if (existingTrainer) {
            return res.status(400).json({ message: "Trainer with this email or phone number already exists.", exists: true });
        }

        // Create and save the new trainer
        const trainer = new Trainer({
            name, email, phone, experience, skills: skills.split(','), resume, baseLocation, linkedInProfile
        });

        await trainer.save();
        res.status(201).json(trainer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllTrainers = async (req, res) => {
    const keyword = req.query.search || '';
    const regex = new RegExp(keyword, 'i');
    const trainers = await Trainer.find({
        $or: [
            { name: regex },
            { email: regex },
            { skills: regex },
            { experience: parseInt(keyword) || -1 }
        ]
    });
    res.json(trainers);
};

export const deleteTrainer = async (req, res) => {
    await Trainer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trainer deleted' });
};

export const getTrainer = async (req, res) => {
    const trainer = await Trainer.findById(req.params.id);
    res.json(trainer);
};
import ClientRequirement from '../models/clientRequirementModel.js';
import AssignedAssignment from '../models/assignedAssignmentModel.js'; // Adjust filename if needed

// Create
export const createRequirement = async (req, res) => {
    try {
        const newRequirement = new ClientRequirement(req.body);
        const saved = await newRequirement.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read All
export const getAllRequirements = async (req, res) => {
    try {
        const data = await ClientRequirement.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Read One
export const getRequirementById = async (req, res) => {
    try {
        const data = await ClientRequirement.findById(req.params.id);
        if (!data) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update with assignmentCode logic


// Delete
export const deleteRequirement = async (req, res) => {
    try {
        const deleted = await ClientRequirement.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Not found' });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateRequirement = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        // Update ClientRequirement document
        const updatedClientReq = await ClientRequirement.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedClientReq) {
            return res.status(404).json({ message: 'ClientRequirement not found' });
        }

        // Upsert AssignedAssignment with same _id and updated data
        const assignedAssignment = await AssignedAssignment.findOneAndUpdate(
            { _id: id },          // match by same _id
            { ...updatedData, _id: id },  // include _id to make sure it's stored correctly
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return res.json(updatedClientReq);
    } catch (error) {
        console.error('Failed to update requirement:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

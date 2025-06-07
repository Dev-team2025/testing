import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import routes
import trainerRoutes from './routes/trainerRoutes.js';
import clientRequirementRoutes from './routes/clientRequirementRoutes.js';
import trainerResponseRoutes from './routes/trainerResponseRoutes.js';
import trainingRoutes from './routes/trainingRoutes.js';
import assignmentResponseRoutes from './routes/assignmentResponseRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Mount API routes
app.use('/api/trainers', trainerRoutes);
app.use('/api/client-requirements', clientRequirementRoutes);
app.use('/api/trainerresponses', trainerResponseRoutes);

app.use('/api/trainings', trainingRoutes);
app.use('/api/combined', assignmentResponseRoutes);
// Remove the duplicate route registration

// Root route
app.get('/', (req, res) => {
    res.send('🚀 Training Requirement Management API is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
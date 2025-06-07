import express from "express";
import multer from "multer";
import { addTrainer, getAllTrainers, deleteTrainer, getTrainer } from "../controllers/trainerController.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/", upload.single("resume"), addTrainer);
router.get("/", getAllTrainers);
router.get("/:id", getTrainer);
router.delete("/:id", deleteTrainer);

export default router;
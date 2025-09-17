import { addMovie, deleteMovieById, getAllMovieByUserId, updateMovieById } from "../controller/trackerController.js";

import { Router } from "express";

const router = Router();


router.post("/movie", addMovie);
router.get("/movie/:userId", getAllMovieByUserId);
router.delete("/movie/:id", deleteMovieById);
router.patch("/movie/:id", updateMovieById);

export default router;
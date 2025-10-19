import {
    addMovie,
    deleteMovieById,
    getAllMovieByUserId,
    getMovieSummaryData,
    updateMovieById,
    getHistoryByDuration
} from "../controller/trackerController.js";

import { Router } from "express";

const router = Router();


router.post("/movie", addMovie);
router.get("/movie/:userId", getAllMovieByUserId);
router.delete("/movie/:id", deleteMovieById);
router.patch("/movie/:id", updateMovieById);
router.get("/movie/summary/:userId", getMovieSummaryData);
router.get("/movie/history/:userId", getHistoryByDuration);

export default router;
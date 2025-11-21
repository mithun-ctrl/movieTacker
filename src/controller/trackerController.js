import { db } from "../firebase.js";

// -------------------------
// ADD MOVIE
// -------------------------
const addMovie = async (req, res) => {
    const { user_id, title, ticket_cost, theatre_name, watched_date, poster_url, movie_format, theatre_format } = req.body;

    if (!user_id || !title || ticket_cost === undefined || !theatre_name || !watched_date) {
        return res.status(400).json({ msg: "All data required" });
    }

    try {
        const newMovieRef = db.ref(`users/${user_id}/movies`).push();

        const movieData = {
            title,
            ticket_cost,
            theatre_name,
            watched_date,
            poster_url: poster_url || "",
            movie_format: movie_format || "",
            theatre_format: theatre_format || "",
            created_at: new Date().toISOString()
        };

        await newMovieRef.set(movieData);

        res.status(201).json({ id: newMovieRef.key, ...movieData });

    } catch (error) {
        console.log("Error posting movie", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


// -------------------------
// GET ALL MOVIES BY USER
// -------------------------
const getAllMovieByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const snapshot = await db.ref(`users/${userId}/movies`).once("value");
        const movies = snapshot.val() || {};

        // Convert object → array
        const movieList = Object.entries(movies).map(([id, movie]) => ({
            id,
            ...movie
        }));

        res.status(200).json(movieList.reverse());

    } catch (error) {
        console.log("Error fetching movie", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


// -------------------------
// DELETE MOVIE
// -------------------------
const deleteMovieById = async (req, res) => {
    const { userId, movieId } = req.params;

    try {
        const movieRef = db.ref(`users/${userId}/movies/${movieId}`);

        const snapshot = await movieRef.once("value");
        if (!snapshot.exists()) {
            return res.status(404).json({ msg: "Movie Not Found" });
        }

        await movieRef.remove();
        res.status(200).json({ msg: "Removed Successfully" });

    } catch (error) {
        console.log("Error deleting movie", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};



// -------------------------
// UPDATE MOVIE
// -------------------------
const updateMovieById = async (req, res) => {
    const { userId, movieId } = req.params;
    const updates = req.body;

    try {
        const movieRef = db.ref(`users/${userId}/movies/${movieId}`);

        const snapshot = await movieRef.once("value");
        if (!snapshot.exists()) {
            return res.status(404).json({ msg: "Movie Not found" });
        }

        await movieRef.update(updates);

        const updatedData = (await movieRef.once("value")).val();

        res.status(200).json({ id: movieId, ...updatedData });

    } catch (error) {
        console.log("Error updating movie", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};



// -------------------------
// MOVIE SUMMARY
// -------------------------
const getMovieSummaryData = async (req, res) => {
    const { userId } = req.params;

    try {
        const snapshot = await db.ref(`users/${userId}/movies`).once("value");
        const movies = snapshot.val() || {};

        const list = Object.values(movies);

        // summary
        const totalMovies = list.length;
        const totalTicketCost = list.reduce((sum, m) => sum + Number(m.ticket_cost || 0), 0);

        const mostExpensiveTicket = list.reduce(
            (max, m) => Number(m.ticket_cost) > Number(max.ticket_cost) ? m : max,
            list[0] || null
        );

        const movie2DCount = list.filter(m => m.movie_format === "2D").length;
        const movie3DCount = list.filter(m => m.movie_format === "3D").length;

        res.status(200).json({
            totalMovies,
            totalTicketCost,
            mostExpensiveTicket,
            movie2DCount,
            movie3DCount
        });

    } catch (error) {
        console.log("Error getting summary", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


// -------------------------
// GET HISTORY BY DURATION
// -------------------------
const getHistoryByDuration = async (req, res) => {
    const { duration } = req.query;
    const { userId } = req.params;

    try {
        const snapshot = await db.ref(`users/${userId}/movies`).once("value");
        const movies = snapshot.val() || {};

        const list = Object.entries(movies).map(([id, data]) => ({
            id,
            ...data
        }));

        const now = new Date();

        const filtered = list.filter(movie => {
            const watched = new Date(movie.watched_date);

            if (duration === "week") return watched >= new Date(now - 7 * 86400000);
            if (duration === "month") return watched >= new Date(now.setMonth(now.getMonth() - 1));
            if (duration === "year") return watched >= new Date(now.setFullYear(now.getFullYear() - 1));
            return true;
        });

        res.status(200).json({
            totalMovies: filtered.length,
            fetchHistory: filtered.sort((a, b) => new Date(b.watched_date) - new Date(a.watched_date))
        });

    } catch (error) {
        console.log("Error getting movie history", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


export {
    addMovie,
    getAllMovieByUserId,
    deleteMovieById,
    updateMovieById,
    getMovieSummaryData,
    getHistoryByDuration
};

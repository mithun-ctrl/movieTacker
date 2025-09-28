import sql from "../config/db.js";
import posterUrl from "../libs/tmdb.js";

const addMovie = async (req, res) => {

    const { user_id, title, ticket_cost, theatre_name, watched_date, movie_format, theatre_format } = req.body;

    if (!user_id || !title || ticket_cost===undefined || !theatre_name || !watched_date) {
        return res.status(401).json({ msg: "All data required" });
    }

    try {

        const url = await posterUrl(title);

        const movie = await sql`
            INSERT INTO movies (user_id, title, ticket_cost, theatre_name, watched_date, poster_url, movie_format, theatre_format)
            VALUES (${user_id}, ${title}, ${ticket_cost}, ${theatre_name}, ${watched_date}, ${url}, ${movie_format}, ${theatre_format})
            RETURNING *;
        `;

        res.status(201).json(movie[0]);

    } catch (error) {
        console.log("Error posting movie", error);
        res.status(400).json({ msg: "Internal server error" });
    }
}

const getAllMovieByUserId = async (req, res) => {

    const { userId } = req.params;

    try {

        const movies = await sql`
            SELECT * FROM movies WHERE user_id = ${userId} ORDER BY id DESC;
        `

        if (movies.length === 0) {
            return res.status(401).json({ msg: "Not found" });
        }
        res.status(201).json(movies);

    } catch (error) {
        console.log("Error fetching movie", error);
        res.status(400).json({ msg: "Internal server error" });
    }
}

const deleteMovieById = async (req, res) => {

    const { id } = req.params;

    try {

        const movie = await sql`
            DELETE FROM movies WHERE id = ${id} RETURNING *;
        `
        if (movie.length === 0) {
            return res.status(401).json({ msg: "Movie Not found" });
        }
        res.status(201).json({ msg: "Removed Successfully" });

    } catch (error) {
        console.log("Error deleting movie", error);
        res.status(400).json({ msg: "Internal server error" });
    }
}

const updateMovieById = async (req, res) => {
    const { id } = req.params;
    const {title, ticket_cost, theatre_name, watched_date, movie_format, theatre_format, poster_url} = req.body;
    try {

        const updatedMovie = await sql`
            UPDATE movies SET title = ${title},
                ticket_cost = ${ticket_cost},
                theatre_name = ${theatre_name},
                watched_date = ${watched_date},
                movie_format = ${movie_format},
                theatre_format = ${theatre_format},
                poster_url = ${poster_url}
                WHERE id = ${id}
            RETURNING *;
        `;

        res.status(201).json(updatedMovie);

    } catch (error) {
        console.log("Error updating movie", error);
        res.status(400).json({ msg: "Internal server error" });
    }
}

const getMovieSummaryData = async (req, res) => {
    const { userId } = req.params;
    // const {title, theatre_name, watched_date, poster_url, ticket_cost, movie_format, theatre_format} = req.body;
    try{
        const totalMovies = await sql`
SELECT COALESCE(COUNT(*), 0) as total_movies_count FROM movies WHERE user_id = ${userId};
`;

        const totalTicketCost = await sql`
SELECT COALESCE(SUM(ticket_cost), 0) as total_spent FROM movies WHERE user_id = ${userId};
`;

        const mostExpensiveTicket = await sql`
SELECT title, theatre_name, ticket_cost, watched_date, poster_url, movie_format, theatre_format 
    FROM movies WHERE user_id = ${userId} ORDER BY ticket_cost DESC LIMIT 1;
`;

        const movie2DCount = await sql`
SELECT COALESCE(COUNT(*), 0) as "movie2DCount" FROM movies WHERE user_id = ${userId} AND movie_format = '2D';
`;

        const movie3DCount = await sql`
            SELECT COALESCE(COUNT(*), 0) as "movie3DCount" FROM movies WHERE user_id = ${userId} AND movie_format = '3D';
`;

        res.status(201).json({
            totalMovies: totalMovies[0].total_movies_count,
            totalTicketCost: totalTicketCost[0].total_spent,
            mostExpensiveTicket: mostExpensiveTicket[0],
            movie2DCount: movie2DCount[0].movie2DCount,
            movie3DCount: movie3DCount[0].movie3DCount
        });

    }catch (e) {
        console.log("Error getting movie summaryData", e);
        res.status(400).json({ msg: "Internal server error" });
    }
}

export { addMovie, getAllMovieByUserId, deleteMovieById, updateMovieById, getMovieSummaryData };
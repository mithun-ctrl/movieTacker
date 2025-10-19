import sql from "./db.js";

const initDatabase = async () => {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS movies(
                id SERIAL PRIMARY KEY,
                user_id VARCHAR(200) NOT NULL,
                title VARCHAR(200) NOT NULL,
                ticket_cost DECIMAL(6, 2) NOT NULL,
                theatre_name VARCHAR(200) NOT NULL,
                watched_date DATE NOT NULL,
                poster_url VARCHAR(255),
                movie_format VARCHAR(3) DEFAULT '2D'
                    CHECK (movie_format IN ('2D', '3D')),
                theatre_format VARCHAR(20) DEFAULT 'PVR'
                    CHECK (theatre_format IN ('IMAX', '4DX', 'EPIQ', 'PVR', 'DOLBY', 'SINGLE SCREEN', 'OTHER')),
                created_at TIMESTAMPTZ DEFAULT (NOW() AT TIME ZONE 'Asis/Kolkata')
            );

        `;
        console.log("Connection successful!!");

    } catch (error) {
        console.log("error creating table ", error)
    }
}

export default initDatabase;


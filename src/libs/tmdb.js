import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TMDB_API = process.env.TMDB_API || "0a69f93180b471839c9f6896690aae6e";

async function posterUrl(title) {
    try {
        const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
            params: {
                api_key: TMDB_API,
                query: title,
            },
        });

        let url = null;

        if (response.data.results.length > 0) {
            const posterPathUrl = response.data.results[0].poster_path;
            if (posterPathUrl) {
                url = `https://image.tmdb.org/t/p/original${posterPathUrl}`;
            }
        }

        console.log(url);
        return url;
    } catch (error) {
        console.error("Error fetching movie poster:", error.message);
    }
}

export default posterUrl

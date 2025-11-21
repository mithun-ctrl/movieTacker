import express from "express";
import { config as configDotenv } from "dotenv";
import movieRoutes from "./routes/movieRoutes.js";
import rateLimiter from "./config/rateLimiter.js";

configDotenv();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(rateLimiter);
app.use(express.json());

app.use("/api/v3", movieRoutes);

app.get("/", async (req, res) => {
    res.status(200).send({
        status: "OK",
    });
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

import express from "express";
import { config as configDotenv } from "dotenv";
import movieRoutes from "./routes/movieRoutes.js";
import rateLimiter from "./config/rateLimiter.js";
import path from "path"; 
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.get("/privacy-policy", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "privacy.html"));
});

app.get("/delete-account", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "deletion.html"));
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

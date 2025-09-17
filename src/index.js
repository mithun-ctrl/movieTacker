import e from "express";
import { configDotenv } from "dotenv";
import initDatabase from "./config/initDB.js"
import movieRoutes from "./routes/movieRoutes.js";

configDotenv();

const app = e();

const PORT = process.env.PORT;


app.use(e.json());

app.use("/api/v3", movieRoutes);

app.get("/api/v3/health", async (req, res) => {
    res.status(200).send({
        status: "OK",
    });
})

initDatabase().then(() =>{
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});



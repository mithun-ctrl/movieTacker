import { neon } from "@neondatabase/serverless";
import { configDotenv } from "dotenv";

configDotenv();

const sql = neon(process.env.DATABSE_URL)

export default sql;
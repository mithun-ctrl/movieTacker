import { neon } from "@neondatabase/serverless";
import { configDotenv } from "dotenv";

configDotenv();

const sql = neon(process.env.DATABASE_URL)

export default sql;
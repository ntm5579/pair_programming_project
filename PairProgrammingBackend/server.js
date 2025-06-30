import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json());

let client;

async function connectToDB() {
  client = await MongoClient.connect(url);
  const db = client.db(dbName);
  return db;
}



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

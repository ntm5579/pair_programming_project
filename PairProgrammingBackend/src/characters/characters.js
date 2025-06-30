import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

const characters = express.Router();

let client;

async function connectToDB() {
  client = await MongoClient.connect(url);
  const db = client.db(dbName);
  return db;
}

characters.get("/characters", async (req, res) => {
  const db = await connectToDB();
  const collection = db.collection("characters");

  try {
    const data = await collection.find({}).toArray();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error with characters");
  }
});

characters.get("/characters/:id", async (req, res) => {
  const db = await connectToDB();
  const collection = db.collection("characters");
  const { id } = req.params;

  try {
    const data = await collection.find({ id: parseInt(id) }).toArray();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error with characters/id");
  }
});

characters.get("/characters/:id/films", async (req, res) => {
  const db = await connectToDB();
  const charactersFilms = db.collection("films_characters");
  const { id } = req.params;
  console.log(id);

  try {
    const data = await charactersFilms
      .aggregate([
        {
          $match: {
            character_id: parseInt(id),
          },
        },
        {
          $lookup: {
            from: "films",
            localField: "film_id", // field in films_characters
            foreignField: "id", // field in films
            as: "film",
          },
        },
        {
          $unwind: "$film",
        },
        {
          $replaceRoot: { newRoot: "$film" },
        },
      ])
      .toArray();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error with characters/id/films");
  }
});

export default characters;

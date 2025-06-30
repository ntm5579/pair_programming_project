import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

const films = express.Router();

let client;

async function connectToDB() {
  client = await MongoClient.connect(url);
  const db = client.db(dbName);
  return db;
}

films.get("/films", async (req, res) => {
  const db = await connectToDB();
  const collection = db.collection("films");

  try {
    const data = await collection.find({}).toArray();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error with films");
  }
});

films.get("/films/:id", async (req, res) => {
  const db = await connectToDB();
  const collection = db.collection("films");
  const { id } = req.params;

  try {
    const data = await collection.find({ id: parseInt(id) }).toArray();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error with films/id");
  }
});

films.get("/films/:id/characters", async (req, res) => {
  const db = await connectToDB();
  const charactersFilms = db.collection("films_characters");
  const { id } = req.params;
//   console.log(id);

  try {
    const data = await charactersFilms
      .aggregate([
        {
          $match: {
            film_id: parseInt(id),
          },
        },
        {
          $lookup: {
            from: "characters",
            localField: "character_id", // field in films_characters
            foreignField: "id", // field in characters
            as: "character",
          },
        },
        {
          $unwind: "$character",
        },
        {
          $replaceRoot: { newRoot: "$character" },
        },
      ])
      .toArray();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error with films/id/characters");
  }
});

films.get("/films/:id/planets", async (req, res) => {
  const db = await connectToDB();
  const planetsFilms = db.collection("films_planets");
  const { id } = req.params;
//   console.log(id);

  try {
    const data = await planetsFilms
      .aggregate([
        {
          $match: {
            film_id: parseInt(id),
          },
        },
        {
          $lookup: {
            from: "planets",
            localField: "planet_id", // field in films_characters
            foreignField: "id", // field in planet
            as: "planet",
          },
        },
        {
          $unwind: "$planet",
        },
        {
          $replaceRoot: { newRoot: "$planet" },
        },
      ])
      .toArray();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error with films/id/planet");
  }
});

export default films;

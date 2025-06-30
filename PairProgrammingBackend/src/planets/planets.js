import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

const planets = express.Router();

let client;

async function connectToDB() {
  client = await MongoClient.connect(url);
  const db = client.db(dbName);
  return db;
}

planets.get("/planets", async (req, res) => {
  const db = await connectToDB();
  const collection = db.collection("planets");

  try {
    const data = await collection.find({}).toArray();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error with planets");
  }
});

planets.get("/planets/:id", async (req, res) => {
  const db = await connectToDB();
  const collection = db.collection("planets");
  const { id } = req.params;

  try {
    const data = await collection.find({ id: parseInt(id) }).toArray();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error with planets/id");
  }
});

planets.get("/planets/:id/characters", async (req, res) => {
  const db = await connectToDB();
  const characters = db.collection("characters");
  const { id } = req.params;
  //   console.log(id);

  try {
    const data = await characters.find({ homeworld: parseInt(id) }).toArray();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error with planets/id/characters");
  }
});

planets.get("/planets/:id/films", async (req, res) => {
  const db = await connectToDB();
  const filmsplanets = db.collection("films_planets");
  const { id } = req.params;
  //   console.log(id);

  try {
    const data = await filmsplanets
      .aggregate([
        {
          $match: {
            planet_id: parseInt(id),
          },
        },
        {
          $lookup: {
            from: "films",
            localField: "film_id", // field in planets_characters
            foreignField: "id", // field in planet
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
    res.status(500).send("Error with planets/id/film");
  }
});

export default planets;

import express from "express";
import cors from "cors";
import characters from "./characters/characters.js";
import films from "./films/films.js";
import planets from "./planets/planets.js";
// const characters = require("./characters/characters");
const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json());

app.use("/api", characters)
app.use("/api", films)
app.use("/api", planets)
app.use(express.static('./public'))
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

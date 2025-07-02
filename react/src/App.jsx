import { useState } from 'react'
import Characters from "./components/Characters";
import Character from "./components/Character";
import Home from "./components/Home";


import Film from "./components/Film";
import Planet from "./components/Planet";


import Films from "./components/Films";
import "./App.css"

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

const App = () => {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/characters/:id" element={<Character />} />
            <Route exact path="/films/:id" element={<Films />} />
            <Route exact path="/planets/:id" element={<Planet />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
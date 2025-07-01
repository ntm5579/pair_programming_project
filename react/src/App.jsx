import { useState } from 'react'
import Characters from "./components/Characters";
import Character from "./components/Character";

import Film from "./components/Film";
import Planets from "./components/Planets";


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
            <Route exact path="/" element={<Characters />} />
            <Route exact path="/character/:id" element={<Character />} />
            <Route exact path="/films/:id" element={<Films />} />
            <Route exact path="/planet/:id" element={<Planets />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
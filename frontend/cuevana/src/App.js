import "./App.css";
import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap';
import "@popperjs/core/dist/esm/popper"
import { Inicio } from "./components/Inicio";
import NavbarCueva from './components/navbar';

import { AddMovie } from "./components/AddMovie";

function App() {
  const [items,setItems] = useState(false);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("ingreso"));
    if (items) {
      setItems(true);
    }
  }, []);
  if (items) {
    return (
      <div className="App">
        <NavbarCueva />
      </div>
    );
  }
  return (
    <div className="App">
      <Inicio />
    </div>
  );
}

export default App;

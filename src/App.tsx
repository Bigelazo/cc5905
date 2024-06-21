import Menu from "./components/Menu";
import "./styles/app.css";
import VersusGrid from "./components/VersusGrid";
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [message, setMessage] = useState<String>("");
  const [actionSelected, setActionSelected] = useState(0);

  return (
    <div className="main-container">
      <div className="info-container">{message}</div>
      <VersusGrid setMessage={setMessage} rows={3} columns={3} />
    </div>
  );
};

export default App;

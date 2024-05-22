import Menu from "./components/Menu";
import "./styles/app.css";
import VersusGrid from "./components/VersusGrid";
import React, { useState } from "react";

const App = () => {
  const [message, setMessage] = useState<String>("");

  return (
    <>
      <div className="main-container">
        <div className="info-container">{message}</div>
        <VersusGrid setMessage={setMessage} rows={3} columns={3} />
      </div>
    </>
  );
};

export default App;

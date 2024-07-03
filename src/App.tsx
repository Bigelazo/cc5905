import Menu from "./components/Menu";
import "./styles/app.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "./components/Grid";
import {
  ActionSelectedContext,
  ActionSelectedProvider,
  CurrentUnitContext,
  CurrentUnitProvider,
} from "./components/context";

const host = "http://localhost:8080";

const App = () => {
  console.log("Rendering App");
  const [message, setMessage] = useState<String>("");

  return (
    <div className="main-container">
      <div className="info-container">{message}</div>
      <ActionSelectedProvider>
        <div className="grid-container">
          {/* <div className="turn-container">
          {allies.concat(enemies).map((c) => {
            return (
              <div
                key={c.id}
                style={currentUnit === c.id ? { color: "green" } : {}}
              >
                {c.name}
              </div>
            );
          })}
        </div> */}
          <CurrentUnitProvider>
            <Grid playerId={1} size={[3, 3]} setMessage={setMessage} />
            <Grid playerId={2} size={[3, 3]} setMessage={setMessage} />
          </CurrentUnitProvider>
          {/* <Menu /> Con este sí funcionan los clicks, providers distintos tienen distintos estados*/}
        </div>
        <Menu />
      </ActionSelectedProvider>
      <button onClick={() => axios.get(`${host}/reset`)}>Reset</button>
    </div>
  );
};

export default App;

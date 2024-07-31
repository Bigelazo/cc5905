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
import { createTheme, ThemeProvider } from '@mui/material/styles';

const host = "http://localhost:8080";

const theme = createTheme({
  typography: {
    fontFamily: 'FFVI',
    fontSize: 16
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: "linear-gradient(to bottom, rgba(87,92,166,0.8), rgba(22,32,83,0.8))",
          color: 'white', // Text color,
          border: "2px solid #ffffff", /* Light border color */
          boxShadow: "0px 0px 5px 1px #000, #000 0px 0px 5px 1px inset",
          borderRadius: 4,
        },
      },
    },
  },
});


const App = () => {
  console.log("Rendering App");
  const [message, setMessage] = useState<String>("");

  return (
    <ThemeProvider theme={theme}>
      <div className="main-container">
        
        <ActionSelectedProvider>
          <CurrentUnitProvider>
            <div className="combat-area">
              <div className="info-container">{message}</div>
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
                <Grid playerId={1} size={[3, 3]} setMessage={setMessage} />
                <Grid playerId={2} size={[3, 3]} setMessage={setMessage} />
                {/* <Menu /> Con este sí funcionan los clicks, providers distintos tienen distintos estados*/}
              </div>
              <Menu />
            </div>
          </CurrentUnitProvider>
        </ActionSelectedProvider>
        <button onClick={() => axios.get(`${host}/reset`)}>Reset</button>
      </div>
    </ThemeProvider>
  );
};

export default App;

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
import { createTheme, ThemeProvider } from "@mui/material/styles";

const host = "http://localhost:8080";

const theme = createTheme({
  typography: {
    fontFamily: "FFVI",
    fontSize: 16,
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background:
            "linear-gradient(to bottom, rgba(87,92,166,0.8), rgba(22,32,83,0.8))",
          color: "white",
          border: "2px solid #ffffff",
          boxShadow: "0px 0px 5px 1px #000, #000 0px 0px 5px 1px inset",
          borderRadius: 4,
        },
      },
    },
  },
});

const App = () => {
  console.log("Rendering App");
  const [message, setMessage] = useState<string>("");

  const [playerIds, setPlayerIds] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [units, setUnits] = useState<string[]>([]);

  const fetchGameData = () => {
    axios.get(`${host}/start`).then((response) => {
      const players = response.data.parties;
      const playerIds = players.map((p: any) => p.id);
      for (const player of players) {
        player.characters.map((c: any) => {
          console.log(c.name);
          units.push(c.name);
        });
      }
      setPlayerIds(playerIds);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="main-container">
        <ActionSelectedProvider>
          <CurrentUnitProvider>
            <div className="combat-area">
              <div className="info-container">{message}</div>
              <div className="grid-container">
                <div className="turn-container">
                  {units.map((c) => {
                    return (
                      <div
                        key={c}
                        //style={currentUnit === c ? { color: "green" } : {}}
                      >
                        {c}
                      </div>
                    );
                  })}
                </div>
                {playerIds.map((playerId) => {
                  return (
                    <Grid
                      key={playerId}
                      playerId={playerId}
                      size={[3, 3]}
                      setMessage={setMessage}
                    />
                  );
                })}
              </div>
              {loading ? <div>Loading...</div> : <Menu playerIds={playerIds} />}
            </div>
          </CurrentUnitProvider>
        </ActionSelectedProvider>
        <button onClick={() => axios.get(`${host}/reset`)}>Reset</button>
      </div>
    </ThemeProvider>
  );
};

export default App;

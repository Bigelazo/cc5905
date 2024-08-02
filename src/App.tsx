import Menu from "./components/Menu";
import "./styles/app.css";
import { useState } from "react";
import axios from "axios";
import Grid from "./components/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFetchGameData } from "./components/useFetch";

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

  const {
    loading,
    playerIds,
    units,
    currentUnit,
    setCurrentUnit,
    actionSelected,
    setActionSelected,
  } = useFetchGameData();

  const receiveAction = (id: string) => {
    axios
      .post(`${HOST}/execute-action/${actionSelected}/${currentUnit}/${id}`)
      .then((response) => {
        setCurrentUnit(response.data.currentUnit);
        setMessage(response.data.message);
        setActionSelected(-1);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="main-container">
        <div className="combat-area">
          <div className="info-container">{message}</div>
          <div className="grid-container">
            <div className="turn-container">
              {units.map((c) => {
                return (
                  <div
                    key={c.id}
                    style={currentUnit === c.id ? { color: "green" } : {}}
                  >
                    {c.name}
                  </div>
                );
              })}
            </div>
            {playerIds.map((playerId) => {
              return (
                <Grid
                  key={playerId}
                  currentUnit={currentUnit}
                  actionSelected={actionSelected}
                  playerId={playerId}
                  size={[3, 3]}
                  handleClick={receiveAction}
                />
              );
            })}
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Menu
              currentUnit={currentUnit}
              actionSelected={actionSelected}
              setActionSelected={setActionSelected}
              playerIds={playerIds}
            />
          )}
        </div>
      </div>
      <button onClick={() => axios.get(`${HOST}/reset`)}>Reset</button>
    </ThemeProvider>
  );
};

export default App;

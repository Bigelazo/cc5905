import { useState } from "react";
import axios from "axios";
import "./app.css";
import MenuComponent from "../Menu/MenuComponent";
import GridComponent from "../Grid/GridComponent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFetchGameData } from "../../hooks/useFetch";

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
    players,
    currentUnit,
    setCurrentUnit,
    actionSelected,
    setActionSelected,
    lastAction,
    setLastAction,
  } = useFetchGameData();

  const allUnits = players.map((p) => p.units).flat();

  const receiveAction = (id: string) => {
    axios
      .post(`${HOST}/execute-action/${actionSelected}/${currentUnit}/${id}`)
      .then((response) => {
        setCurrentUnit(response.data.currentUnit);
        setMessage(response.data.message);
        setActionSelected(-1);
        setLastAction({
          sourceId: currentUnit,
          targetId: id,
          actionId: actionSelected,
        });
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="main-container">
        <div className="combat-area">
          <div className="info-container">{message}</div>
          <div className="grid-container">
            <div className="turn-container">
              {allUnits.map((c) => {
                return (
                  <div
                    key={c.id}
                    style={currentUnit === c.id ? { color: "yellow" } : {}}
                  >
                    {c.name}
                  </div>
                );
              })}
            </div>
            {players.map((player) => {
              return (
                <GridComponent
                  key={player.id}
                  currentUnit={currentUnit}
                  actionSelected={actionSelected}
                  player={player}
                  size={[3, 3]}
                  handleClick={receiveAction}
                  lastAction={lastAction}
                />
              );
            })}
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <MenuComponent
              currentUnit={currentUnit}
              actionSelected={actionSelected}
              setActionSelected={setActionSelected}
              playerIds={players.map((p) => p.id)}
            />
          )}
        </div>
      </div>
      <button onClick={() => axios.get(`${HOST}/reset`)}>Reset</button>
      {/* TODO: Hacer que el botón re-renderee App */}
    </ThemeProvider>
  );
};

export default App;

import { useEffect, useState } from "react";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFetchGameData } from "../../hooks/useFetch";
import MenuComponent from "../Menu/MenuComponent";
import GridComponent from "../Grid/GridComponent";
import "./app.css";

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
    isLoading,
    players,
    panels,
    currentUnit,
    setCurrentUnit,
    actionSelected,
    setActionSelected,
    targetSelected,
    setTargetSelected,
    lastAction,
    setLastAction,
  } = useFetchGameData();

  console.log("Action selected: " + actionSelected);

  const allUnits = players.map((p) => p.units).flat();

  useEffect(() => {
    if (actionSelected != null && targetSelected != null) {
      executeAction(targetSelected);
    }
  }, [actionSelected, targetSelected]);

  const executeAction = (targetId: string) => {
    axios
      .post(
        `${HOST}/execute-action/${actionSelected}/${currentUnit}/${targetId}`
      )
      .then((response) => {
        setCurrentUnit(response.data.currentUnit);
        setMessage(response.data.message);
        setActionSelected(undefined);
        setTargetSelected(undefined);
        setLastAction({
          sourceId: currentUnit,
          targetId: targetId,
          actionId: actionSelected,
          players: players,
          panels: panels,
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
                    {c?.attributes.find((a) => a.name === "name")?.value}
                  </div>
                );
              })}
            </div>
            <GridComponent
              currentUnit={currentUnit}
              actionSelected={actionSelected}
              characters={allUnits}
              panels={panels}
              size={[3, 3]}
              setTargetSelected={setTargetSelected}
              lastAction={lastAction}
            />
          </div>
          {!isLoading && (
            <MenuComponent
              currentUnit={currentUnit}
              actionSelected={actionSelected}
              setActionSelected={setActionSelected}
              setTargetSelected={setTargetSelected}
              units={players[0].units}
              units2={players[1].units}
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

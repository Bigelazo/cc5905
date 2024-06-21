import { ReactNode, useState } from "react";
import CharacterComponent from "./CharacterComponent";
import Character from "../model/Character";
import Panel from "../model/Panel";
import { Button } from "@mui/material";

interface Props {
  id: number;
  x: number;
  y: number;
  assign: (p: number, c: number) => void;
  movables: Character[];
  currentPlayer: number | null;
  doActionSelected: (c: number) => () => void;
  actionSelected: number | null;
}

const PanelComponent = ({
  id,
  x,
  y,
  movables,
  currentPlayer,
  actionSelected,
  doActionSelected,
  assign,
}: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={
        false
          ? { gridColumnStart: x, gridRowStart: y, border: "3px solid green" }
          : { gridColumnStart: x, gridRowStart: y }
      }
      className={"grid__panel" + (actionSelected !== null ? " selection" : "")}
      onClick={doActionSelected(id)}
    >
      {movables.map((c: Character) => {
        return (
          <CharacterComponent
            key={c.id}
            c={c}
            currentPlayer={currentPlayer}
            doActionSelected={doActionSelected}
          />
        );
      })}
      {show && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "#555",
            padding: "8px",
            borderRadius: "5px",
          }}
        >
          <div>ID: {id}</div>
          <div>
            Coordenadas: ({x},{y})
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelComponent;

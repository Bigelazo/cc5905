import { ReactNode } from "react";
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

const PanelComponent = ({ id, x, y, movables, currentPlayer, actionSelected, doActionSelected }: Props) => {
  return (
    <div
      style={{ gridColumnStart: x, gridRowStart: y }}
      className={"grid__panel"+(actionSelected!==null ? " selection" : "")}
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
    </div>
  );
};

export default PanelComponent;

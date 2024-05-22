import { ReactNode } from "react";
import CharacterComponent from "./CharacterComponent";
import Character from "../model/Character";
import Panel from "../model/Panel";
import { Button } from "@mui/material";

interface Props {
  id: number;
  x: number;
  y: number;
  children: ReactNode;
  assign: (p: number, c: number) => void;
}

const PanelComponent = ({ id, x, y, children, assign }: Props) => {
  return (
    <div
      className="grid__panel"
      style={{ gridColumnStart: x, gridRowStart: y }}
    >
      ({x},{y}) id={id}
      {children}
      <Button onClick={() => assign(1, 3)}>Do</Button>
    </div>
  );
};

export default PanelComponent;

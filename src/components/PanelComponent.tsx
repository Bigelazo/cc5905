import React from "react";
import CharacterComponent from "./CharacterComponent";
import Character from "../model/Character";

interface Props {
  x: number;
  y: number;
}

const PanelComponent = ({ x, y }: Props) => {
  return (
    <div
      className="grid__panel"
      style={{ gridColumnStart: x, gridRowStart: y }}
    >
      ({x},{y})
    </div>
  );
};

export default PanelComponent;

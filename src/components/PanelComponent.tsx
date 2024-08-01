import { ReactNode, useContext, useState } from "react";
import CharacterComponent from "./CharacterComponent";
import Character from "../model/Character";
import Panel from "../model/Panel";
import { ActionSelectedContext, CurrentUnitContext } from "./context";
import axios from "axios";

interface Props {
  p: Panel;
  units: Character[];
  setMessage: (s: string) => void;
  handleClick: (id: string) => void;
}

const PanelComponent = ({ p, units, setMessage, handleClick }: Props) => {
  console.log("Rendering Panel " + p.id);

  const { currentUnit, setCurrentUnit } = useContext(CurrentUnitContext);
  const { actionSelected, setActionSelected } = useContext(
    ActionSelectedContext
  );

  const ids = units.map((u) => u.id);

  return (
    <div
      onClick={
        actionSelected == 2
          ? () => {
              handleClick(p.id);
            }
          : () => {}
      }
      style={
        ids.includes(currentUnit)
          ? {
              gridColumnStart: p.x,
              gridRowStart: p.y,
              backgroundColor: "yellow",
            }
          : { gridColumnStart: p.x, gridRowStart: p.y }
      }
      className={"grid__panel" + (0 !== null ? " selection" : "")}
    >
      {units.map((c: Character) => {
        return (
          <CharacterComponent
            key={c.id}
            c={c}
            setMessage={setMessage}
            handleClick={handleClick}
          />
        );
      })}
    </div>
  );
};

export default PanelComponent;

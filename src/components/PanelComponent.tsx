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
}

const PanelComponent = ({ p, units, setMessage }: Props) => {
  console.log("Rendering Panel " + p.id);

  const { currentUnit, setCurrentUnit } = useContext(CurrentUnitContext);
  const { actionSelected, setActionSelected } = useContext(
    ActionSelectedContext
  );

  const ids = units.map((u) => u.id);

  const receiveMovingUnit = () => {
    axios
      .post("http://localhost:8080/assign/" + currentUnit + "/" + p.id)
      .then((response) => {
        setCurrentUnit(response.data.currentUnit);
        console.log(response.data);
        setMessage(currentUnit + " moved to panel id " + p.id);
        setActionSelected(-1);
      });
  };

  return (
    <div
      onClick={actionSelected === 2 ? () => receiveMovingUnit() : () => {}}
      style={
        ids.includes(currentUnit)
          ? {
              gridColumnStart: p.x,
              gridRowStart: p.y,
              border: "3px solid green",
            }
          : { gridColumnStart: p.x, gridRowStart: p.y }
      }
      className={"grid__panel" + (0 !== null ? " selection" : "")}
    >
      {units.map((c: Character) => {
        return <CharacterComponent key={c.id} c={c} setMessage={setMessage} />;
      })}
    </div>
  );
};

export default PanelComponent;

import React, { useContext, useEffect, useState } from "react";
import Character from "../model/Character";
import Panel from "../model/Panel";
import PanelComponent from "./PanelComponent";
import "../styles/grid.css";
import axios from "axios";
import { ActionSelectedContext, CurrentUnitContext } from "./context";

interface Props {
  playerId: string;
  size: [number, number];
  setMessage: (s: string) => void;
}

const Grid = ({ playerId, size, setMessage }: Props) => {
  console.log("Rendering Grid " + playerId);

  const [units, setUnits] = useState<Character[]>([]);
  const [panels, setPanels] = useState<Panel[]>([]);

  const { currentUnit, setCurrentUnit } = useContext(CurrentUnitContext);
  const { actionSelected, setActionSelected } = useContext(
    ActionSelectedContext
  );

  const loadGridData = () => {
    axios.get("http://localhost:8080/grid/" + playerId).then((response) => {
      const data = response.data;
      const units: Character[] = data.units.map((c: any) => {
        return new Character(c.id, c.name, c.hp, c.attack, c.img, c.mappableId);
      });
      const panels: Panel[] = data.panels.map((p: any) => {
        return new Panel(p.id, p.x, p.y);
      });

      setUnits(units);
      setPanels(panels);
    });
  };

  useEffect(() => {
    loadGridData();
  }, [currentUnit]);

  const receiveAction = (id: string) => {
    axios
      .post(
        `http://localhost:8080/execute-action/${actionSelected}/${currentUnit}/${id}`
      )
      .then((response) => {
        setCurrentUnit(response.data.currentUnit);
        setMessage(response.data.message);
        setActionSelected(-1);
      });
  };

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${size[1]}, 1fr)`,
        gridTemplateRows: `repeat(${size[0]}, 1fr)`,
        position: "relative",
      }}
    >
      {panels.map((p: Panel) => {
        return (
          <PanelComponent
            key={p.id}
            p={p}
            units={units.filter((u) => u.mappableId == p.id)}
            setMessage={setMessage}
            handleClick={receiveAction}
          />
        );
      })}
    </div>
  );
};

export default Grid;

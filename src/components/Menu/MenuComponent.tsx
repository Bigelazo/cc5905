import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../Button";
import Character from "../../model/Character";
import "./menu.css";

const UnitList = ({ units }: { units: Character[] }) => {
  return (
    <div className="queue-info">
      {units.map((c: Character) => {
        return (
          <div key={c.id}>
            <div className="info">
              <div className="info-name">{c.name}</div>
              <div className="info-others">
                <label className="info-label">HP</label> {c.hp}/999
              </div>
            </div>
            {/*i<units.length-1?<div className="info-separator"/>:null*/}
          </div>
        );
      })}
    </div>
  );
};

interface Props {
  currentUnit: string;
  actionSelected: number;
  setActionSelected: (actionId: number) => void;
  playerIds: string[];
}

const MenuComponent = ({
  currentUnit,
  actionSelected,
  setActionSelected,
  playerIds,
}: Props) => {
  const [units, setUnits] = useState<Character[]>([]);
  const [units2, setUnits2] = useState<Character[]>([]);

  const loadGridData = () => {
    axios.get(`${HOST}/grid/${playerIds[0]}`).then((response) => {
      const data = response.data;
      const units: Character[] = data.units.map((c: any) => {
        return new Character(c.id, c.name, c.hp, c.attack, c.img, c.mappableId);
      });
      setUnits(units);
    });
  };

  const loadGridData2 = () => {
    axios.get(`${HOST}/grid/${playerIds[1]}`).then((response) => {
      const data = response.data;
      const units: Character[] = data.units.map((c: any) => {
        return new Character(c.id, c.name, c.hp, c.attack, c.img, c.mappableId);
      });
      setUnits2(units);
    });
  };

  const showCurrentUnitActions = () => {
    axios.get(`${HOST}/show-actions/${currentUnit}`).then((response) => {
      const data = response.data.actions;
      let a: { [key: string]: number } = {};
      let holder: { [key: string]: { [key: string]: number } } = {};
      for (let arrayId in data) {
        let id: number = data[arrayId].id;
        let action: string = data[arrayId].action;
        if (action.includes("→")) {
          const category: string = action.split("→")[0];
          const actionName: string = action.split("→")[1];
          holder[category] === undefined
            ? (holder[category] = { [actionName]: id })
            : (holder[category][actionName] = id);
          a[category] = -id;
        } else {
          a[action] = id;
        }
      }
      setActionHolder(holder);
      setActions(a);
    });
  };

  const swapActions = (actionName: string) => {
    const holder = actionHolder;
    const action = actions;
    if (actionName === "Go Back") {
      // Queremos volver al menú anterior
      setActions(holder);
      setActionHolder(action);
    } else {
      // Queremos ir al siguiente menú indexado
      if (holder[actionName] === undefined) {
        setActions(holder);
      } else {
        holder[actionName]["Go Back"] = -100;
        setActions(holder[actionName]);
      }
      setActionHolder(action);
    }
  };

  const [actions, setActions] = useState<{ [key: string]: number }>({ "": 0 });
  const [actionHolder, setActionHolder] = useState<{
    [key: string]: any;
  }>({ "": { "": 0 } });

  useEffect(() => {
    loadGridData();
    loadGridData2();
  }, [actionSelected]);

  useEffect(() => {
    showCurrentUnitActions();
  }, [currentUnit]);

  return (
    <div className="menu-container">
      <UnitList units={units} />
      <div className="action-selection">
        {Object.entries(actions).map(([actionName, actionId]) => {
          return (
            <Button
              key={actionId}
              onClick={
                actionId < 0
                  ? () => swapActions(actionName)
                  : () => setActionSelected(actionId)
              }
              selected={actionSelected == actionId}
            >
              {actionName}
            </Button>
          );
        })}
      </div>
      <UnitList units={units2} />
    </div>
  );
};

export default MenuComponent;

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
          <div key={c.id} className="info">
            {Object.entries(c.attributes).map(([key, value]) => {
              return (
                <div className="info">
                  <div className="info-others">
                    <label className="info-label">{key}:</label> {value}
                  </div>
                </div>
              );
            })}
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
  units: Character[];
  units2: Character[];
}

const MenuComponent = ({
  currentUnit,
  actionSelected,
  setActionSelected,
  units,
  units2,
}: Props) => {
  const [actions, setActions] = useState<{ [key: string]: number }>({ "": 0 });

  const [actionHolder, setActionHolder] = useState<{ [key: string]: any }>({
    "": { "": 0 },
  });

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
                actionId < 0 // actionId negativo es querer volver al menú anterior
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

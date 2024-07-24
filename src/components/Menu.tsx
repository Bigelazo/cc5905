import React, { useContext, useEffect, useState } from "react";
import "../styles/menu.css";
import Button from "./Button";
import { ActionSelectedContext, CurrentUnitContext } from "./context";
import Character from "../model/Character";
import axios from "axios";

const Menu = () => {
  console.log("Rendering Menu");

  const { actionSelected, setActionSelected } = useContext(
    ActionSelectedContext
  );

  const { currentUnit, setCurrentUnit } = useContext(CurrentUnitContext);

  const [units, setUnits] = useState<Character[]>([]);
  const [units2, setUnits2] = useState<Character[]>([]);

  const playerId: number = 1;
  const enemyId: number = 2;

  const loadGridData = () => {
    axios.get("http://localhost:8080/grid/" + playerId).then((response) => {
      const data = response.data;
      const units: Character[] = data.units.map((c: any) => {
        return new Character(c.id, c.name, c.hp, c.attack, c.img, c.mappableId);
      });
      setUnits(units);
    });
  };

  const loadGridData2 = () => {
    axios.get("http://localhost:8080/grid/" + enemyId).then((response) => {
      const data = response.data;
      const units: Character[] = data.units.map((c: any) => {
        return new Character(c.id, c.name, c.hp, c.attack, c.img, c.mappableId);
      });
      setUnits2(units);
    });
  };

  const showCurrentUnitActions = () => {
    axios
      .get("http://localhost:8080/show-actions/" + currentUnit)
      .then((response) => {
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
        console.log(data);
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
      <div className="left-info">
        <div className="info">
          <div style={{ color: "black" }}>
            <p>NAME</p>
            <p>HP</p>
            <p>ATK</p>
          </div>
          {units.map((c: Character) => {
            return (
              <div className="headers" style={{ border: "1px solid black" }}>
                <p>{c.name}</p>
                <p>{c.hp}</p>
                <p>{c.atk}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="action-selection">
        {Object.entries(actions).map(([actionName, actionId]) => {
          return (
            <Button
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
      <div className="right-info">
        <div className="info">
          <div style={{ color: "black" }}>
            <p>NAME</p>
            <p>HP</p>
            <p>ATK</p>
          </div>
          {units2.map((c: Character) => {
            return (
              <div className="headers" style={{ border: "1px solid black" }}>
                <p>{c.name}</p>
                <p>{c.hp}</p>
                <p>{c.atk}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;

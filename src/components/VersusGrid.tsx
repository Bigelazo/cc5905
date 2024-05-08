import React from "react";
import Character from "./Character";
import Character_ from "../model/Character_";
import "../styles/grid.css";

const VersusGrid = () => {
  const elements: number[] = Array.from(Array(4).keys());

  const c1: Character_ = new Character_("Daniel", 100, 10);
  const c2: Character_ = new Character_("Mati", 200, 5);

  function receiveDamage(atk: number): void {
    return;
  }
  return (
    <div className="grid-container">
      <div className="turn-container">
        {elements.map((row) => {
          return <div>TURN</div>;
        })}
      </div>

      <div className="grid grid--left">
        {elements.map((row) => {
          return (
            <div className="grid__panel">
              <Character c={c1} receiveDamage={receiveDamage} />
            </div>
          );
        })}
      </div>

      <div className="grid grid--right">
        {elements.map((row) => {
          return (
            <div className="grid__panel">
              <Character c={c2} receiveDamage={receiveDamage} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VersusGrid;

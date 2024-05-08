import React from "react";
import Character from "./Character";
import Character_ from "../model/Character_";
import "../styles/grid.css";

const VersusGrid = () => {
  const elements: number[] = Array.from(Array(4).keys());

  const createCharacters = async () => {
    let characters: Character_[] = [];
    const response = await fetch("http://localhost:8080/character");
    const characterInformation = await response.json();
    for (const c of characterInformation) {
      characters.push(new Character_(c[0], c[1], c[2], c[3]));
    }
    return characters;
  };

  const characterList: Promise<Character_[]> = createCharacters();

  const allies = characterList.then((resolved) => {
    resolved.slice(0, 2);
  });
  const enemies = characterList.then((resolved) => {
    resolved.slice(2, 5);
  });

  function attack(fromId: number, toId: number): void {
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
              <Character
                c={characterList.then((resolved) => {
                  resolved[0];
                })}
                attack={attack(1, 2)}
              />
            </div>
          );
        })}
      </div>

      <div className="grid grid--right">
        {elements.map((row) => {
          return (
            <div className="grid__panel">
              <Character c={characterList[1]} attack={attack(1, 2)} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VersusGrid;

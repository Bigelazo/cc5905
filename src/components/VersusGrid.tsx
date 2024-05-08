import React, { useEffect, useState } from "react";
import CharacterComponent from "./CharacterComponent";
import Character from "../model/Character";
import "../styles/grid.css";
import axios from 'axios';

const host = "http://localhost:8080"

interface Props {
  setMessage: (message: string) => void;
}

const VersusGrid = ({ setMessage }: Props) => {
  const elements: number[] = Array.from(Array(4).keys());
  const [allies, setAllies] = useState<Character[]>([]);
  const [enemies, setEnemies] = useState<Character[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  

  const loadCharacters = () => {
    axios.get(host + "/character").then((response: any) => {    
      const characters: Character[] = response.data.characters.map((c: any) => {
        return new Character(c.id, c.name, c.hp, c.attack);
      });
      console.log("response.data.characters", response.data.characters)
      console.log("ncontre", characters)
      setAllies(characters.slice(0, 6));
      setEnemies(characters.slice(6, 12));
      setCurrentPlayer(response.data.currentPlayer);
    })
    
  };

  useEffect(() => {
    loadCharacters();
  }, []);
  

  function attack(toId: number): void {
    if(currentPlayer){
      console.log("atacando de", currentPlayer, "para", toId)
      axios.get(host + "/attack/" + currentPlayer + "/" + toId).then((response: any) => {
        setMessage(response.data.message)
        loadCharacters();
      })
    }
    return;
  }

  console.log("allies", allies)
  return (
    <div className="grid-container">
      <div className="turn-container">
        {allies.concat(enemies).map((c) => {
          return <div style={currentPlayer == c.id?{border: "1px solid yellow"}:{}}>{c.name}</div>;
        })}
      </div>

      <div className="grid grid--left">
        {allies.map((c: Character) => {
          return (
            <div className="grid__panel" style={currentPlayer == c.id?{border: "1px solid yellow"}:{}}>
              <CharacterComponent
                c={c}
                attack={attack}
                currentPlayer={currentPlayer}
              />
            </div>
          );
        })}
      </div>

      <div className="grid grid--right">
        {enemies.map((c) => {
          return (
            <div className="grid__panel">
              <CharacterComponent c={c} attack={attack} currentPlayer={currentPlayer} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VersusGrid;

import React, { useEffect, useState } from "react";
import CharacterComponent from "./CharacterComponent";
import Character from "../model/Character";
import "../styles/grid.css";
import axios from "axios";
import PanelComponent from "./PanelComponent";

const host = "http://localhost:8080";

interface Props {
  setMessage: (message: string) => void;
  rows: number;
  columns: number;
}

/* para que no se me olvide:
backend
character tiene panel como atributo
panel tiene lista de character como atributo
panel tiene coordenadas como atributo
character llama a panel.coordenadas para saber dónde está parado

enviar todos los paneles del juego por json
enviar en la lista de personajes los paneles -> /character

después:
buscar la manera de que PanelComponent pueda tener un CharacterComponent dentro con
las cosas que están definidas aquí, que en realidad debiesen estar en App.tsx
preguntar cómo ir bajando esa info por partes y solo lo necesario para cada subcomponente
*/

const VersusGrid = ({ setMessage, rows, columns }: Props) => {
  const [allies, setAllies] = useState<Character[]>([]);
  const [enemies, setEnemies] = useState<Character[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);

  const loadCharacters = () => {
    axios.get(host + "/character").then((response: any) => {
      const characters: Character[] = response.data.characters.map((c: any) => {
        return new Character(c.id, c.name, c.hp, c.attack);
      });
      setAllies(characters.slice(0, 6));
      setEnemies(characters.slice(6, 12));
      setCurrentPlayer(response.data.currentPlayer);
    });
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  function attack(toId: number): void {
    if (currentPlayer) {
      axios
        .get(host + "/attack/" + currentPlayer + "/" + toId)
        .then((response: any) => {
          setMessage(response.data.message);
          loadCharacters();
        });
    }
    return;
  }

  return (
    <div className="grid-container">
      <div className="turn-container">
        {allies.concat(enemies).map((c) => {
          return (
            <div
              style={currentPlayer == c.id ? { border: "3px solid green" } : {}}
            >
              {c.name}
            </div>
          );
        })}
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          position: "relative"
        }}
      >
        
        {allies.map((c: Character) => {
          return (
            <div
              className="grid__panel"
              style={currentPlayer == c.id ? { border: "3px solid green" } : {}}
            >
              <CharacterComponent
                c={c}
                attack={attack}
                currentPlayer={currentPlayer}
              />
            </div>
          );
        })}
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {enemies.map((c: Character) => {
          return <PanelComponent x={1} y={1} />;
        })}
      </div>
    </div>
  );
};

export default VersusGrid;

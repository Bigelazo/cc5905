import { useEffect, useRef, useState } from "react";
import CharacterComponent from "./CharacterComponent";
import Character from "../model/Character";
import Panel from "../model/Panel";
import "../styles/versusGrid.css";
import axios from "axios";
import PanelComponent from "./PanelComponent";

const host = "http://localhost:8080";

interface Props {
  setMessage: (message: string) => void;
  rows: number;
  columns: number;
}

const VersusGrid = ({ setMessage, rows, columns }: Props) => {
  const [allies, setAllies] = useState<Character[]>([]);
  const [enemies, setEnemies] = useState<Character[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);

  const [panels, setPanels] = useState<Panel[]>([]);

  const winCondition = useRef([]);

  const loadGameData = () => {
    axios.get(`${host}/`).then((response: any) => {
      const allies: Character[] = response.data.players[0].characters.map(
        (c: any) => {
          return new Character(c.id, c.name, c.hp, c.attack);
        }
      );
      const enemies: Character[] = response.data.players[1].characters.map(
        (c: any) => {
          return new Character(c.id, c.name, c.hp, c.attack);
        }
      );
      const currentCharacter = response.data.currentCharacter;
      const panels: Panel[] = response.data.panels.map((p: any) => {
        return new Panel(p.id, p.x, p.y);
      });

      setAllies(allies);
      setEnemies(enemies);
      setCurrentPlayer(currentCharacter);
      setPanels(panels);
    });
  };

  useEffect(() => {
    loadGameData();
  }, []);

  const assignPanel = (cId: number, pId: number) => {
    axios
      .post(`${host}/assign/${cId}/${pId}`)
      .then((response) => console.log(response));
  };

  const winConditionReached = () => {};

  const loadCharacters = () => {
    axios.get(`${host}/character`).then((response: any) => {
      const characters: Character[] = response.data.characters.map((c: any) => {
        return new Character(c.id, c.name, c.hp, c.attack);
      });
      setAllies(characters.slice(0, 4));
      setEnemies(characters.slice(4, 9));
      setCurrentPlayer(response.data.currentCharacter);
    });
  };

  const attack = (toId: number) => {
    if (currentPlayer) {
      axios
        .post(host + "/attack/" + currentPlayer + "/" + toId)
        .then((response: any) => {
          setMessage(response.data.message);
          loadCharacters();
        });
    }
    return;
  };

  return (
    <div className="grid-container">
      <div className="turn-container">
        {allies.concat(enemies).map((c) => {
          return (
            <div
              key={c.id}
              style={currentPlayer === c.id ? { color: "green" } : {}}
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
          position: "relative",
        }}
      >
        {allies.map((c: Character) => {
          return (
            <div
              className="grid__panel"
              style={
                currentPlayer === c.id ? { border: "3px solid green" } : {}
              }
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
          position: "relative",
        }}
      >
        {enemies.map((c: Character) => {
          return (
            <div
              className="grid__panel"
              style={
                currentPlayer === c.id ? { border: "3px solid green" } : {}
              }
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
    </div>
  );
};

export default VersusGrid;

/* 
  const loadCharacters = () => {
    axios.get(`${host}/character`).then((response: any) => {
      const characters: Character[] = response.data.characters.map((c: any) => {
        return new Character(c.id, c.name, c.hp, c.attack);
      });
      setAllies(characters.slice(0, 4));
      setEnemies(characters.slice(4, 9));
      setCurrentPlayer(response.data.currentCharacter);
      console.log(response.data);
    });
  };

  const loadPanels = () => {
    axios.get(`${host}/panel`).then((response: any) => {
      const panels: Panel[] = response.data.panels.map((p: any) => {
        return new Panel(p.id, p.x, p.y);
      });
      setPanels(panels);
      console.log(response.data);
    });
  };
*/

/*
        {panels.map((p: Panel) => {
          return (
            <PanelComponent
              key={p.id}
              id={p.id}
              x={p.x}
              y={p.y}
              assign={assignPanel}
            >
              {allies.map((c: Character) => {
                return (
                  <CharacterComponent
                    key={allies[0].id}
                    c={allies[0]}
                    attack={attack}
                    currentPlayer={currentPlayer}
                  />
                );
              })}
            </PanelComponent>
          );
        })}
*/

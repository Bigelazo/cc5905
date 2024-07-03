import axios from "axios";
import { useEffect, useState } from "react";
import Character from "../model/Character";
import Panel from "../model/Panel";

const host = "http://localhost:8080";

export const useFetchGameData = () => {
  const [allies, setAllies] = useState<Character[]>([]);
  const [enemies, setEnemies] = useState<Character[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<number | null>(null);
  const [actionSelected, setActionSelected] = useState<number | null>(null);
  const [panels, setPanels] = useState<Panel[]>([]);

  const isCurrentPlayerAlly =
    allies.find((c) => c.id === currentPlayer) != null;

  const loadGameData = () => {
    axios.get(`${host}/`).then((response: any) => {
      const allies: Character[] = response.data.parties[0].characters.map(
        (c: any) => {
          return new Character(c.id, c.name, c.hp, c.attack, c.mappableId);
        }
      );
      const enemies: Character[] = response.data.parties[1].characters.map(
        (c: any) => {
          return new Character(c.id, c.name, c.hp, c.attack, null);
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

  const response: [
    Character[],
    React.Dispatch<React.SetStateAction<Character[]>>,
    Character[],
    React.Dispatch<React.SetStateAction<Character[]>>,
    number | null,
    number | null,
    Panel[]
  ] = [
    allies,
    setAllies,
    enemies,
    setEnemies,
    currentPlayer,
    actionSelected,
    panels,
  ];

  return response;
};

export const useFetchCharacters = () => {};

export const useFetchPanels = () => {};

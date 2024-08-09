import axios from "axios";
import { useEffect, useState } from "react";
import Character from "../model/Character";
import Panel from "../model/Panel";
import Player from "../model/Player";

interface FetchGameDataProps {
  isLoading: boolean;
  players: Player[];
  panels: Panel[];
  currentUnit: string;
  setCurrentUnit: (currentUnit: string) => void;
  actionSelected: string | undefined;
  setActionSelected: (actionSelected: string | undefined) => void;
  targetSelected: string | undefined;
  setTargetSelected: (targetSelected: string | undefined) => void;
  lastAction: LastActionType;
  setLastAction: (lastAction: LastActionType) => void;
}

export type LastActionType = {
  sourceId: string | undefined;
  targetId: string | undefined;
  actionId: string | undefined;
  players: Player[];
  panels: Panel[];
};

export const useFetchGameData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<Player[]>([]);
  const [panels, setPanels] = useState<Panel[]>([]);
  const [currentUnit, setCurrentUnit] = useState<string>("");
  const [actionSelected, setActionSelected] = useState<string | undefined>(
    undefined
  );
  const [targetSelected, setTargetSelected] = useState<string | undefined>(
    undefined
  );
  const [lastAction, setLastAction] = useState<LastActionType>({
    sourceId: undefined,
    targetId: undefined,
    actionId: undefined,
    players: [],
    panels: [],
  });

  const fetchGameData = () => {
    axios.get(`${HOST}/start`).then((response) => {
      const playerData = response.data.players;
      setCurrentUnit(response.data.currentUnit);
      setPlayers(
        playerData.map((player: any) => {
          let units: Character[] = player.characters.map(
            (c: any) => new Character(c.id, c.img, c.attributes)
          );
          return new Player(player.id, player.name, units);
        })
      );
      setPanels(
        response.data.panels.map(
          (p: any) => new Panel(p.id, p.x, p.y, p.storage)
        )
      );
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchGameData();
  }, [currentUnit]);

  const response: FetchGameDataProps = {
    isLoading,
    players,
    panels,
    currentUnit,
    setCurrentUnit,
    actionSelected,
    setActionSelected,
    targetSelected,
    setTargetSelected,
    lastAction,
    setLastAction,
  };

  return response;
};

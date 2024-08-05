import axios from "axios";
import { useEffect, useState } from "react";
import Character from "../model/Character";
import Panel from "../model/Panel";
import Player from "../model/Player";

interface FetchGameDataProps {
  isLoading: boolean;
  players: Player[];
  currentUnit: string;
  setCurrentUnit: (currentUnit: string) => void;
  actionSelected: string;
  setActionSelected: (actionSelected: string) => void;
  lastAction: LastActionType;
  setLastAction: (lastAction: LastActionType) => void;
}

export type LastActionType = {
  sourceId: string | null;
  targetId: string | null;
  actionId: string | null;
};

export const useFetchGameData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentUnit, setCurrentUnit] = useState<string>("");
  const [actionSelected, setActionSelected] = useState<string>("MainMenu");
  const [lastAction, setLastAction] = useState<LastActionType>({
    sourceId: null,
    targetId: null,
    actionId: null,
  });

  const fetchGameData = () => {
    axios.get(`${HOST}/start`).then((response) => {
      const playerData = response.data.players;
      const currentUnit = response.data.currentUnit;
      setCurrentUnit(currentUnit);

      const players: Player[] = playerData.map((player: any) => {
        let units: Character[] = [];
        const panels: Panel[] = player.panels.map((panel: any) => {
          const panelUnits = panel.storage.map((c: any) => {
            const unit = new Character(c.id, c.img, c.attributes);
            units.push(unit);
            return unit;
          });
          return new Panel(panel.id, panel.x, panel.y, panelUnits);
        });
        return new Player(player.id, player.name, units, panels);
      });
      setPlayers(players);

      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchGameData();
  }, [currentUnit]);

  const response: FetchGameDataProps = {
    isLoading,
    players,
    currentUnit,
    setCurrentUnit,
    actionSelected,
    setActionSelected,
    lastAction,
    setLastAction,
  };

  return response;
};

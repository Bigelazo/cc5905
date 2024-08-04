import axios from "axios";
import { useEffect, useState } from "react";
import Character from "../model/Character";
import Panel from "../model/Panel";
import Player from "../model/Player";

interface FetchGameDataProps {
  loading: boolean;
  players: Player[];
  currentUnit: string;
  setCurrentUnit: (currentUnit: string) => void;
  actionSelected: number;
  setActionSelected: (actionSelected: number) => void;
  lastAction: LastActionType;
  setLastAction: (lastAction: LastActionType) => void;
}

export type LastActionType = {
  sourceId: string | null;
  targetId: string | null;
  actionId: number | null;
};

export const useFetchGameData = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentUnit, setCurrentUnit] = useState<string>("");
  const [actionSelected, setActionSelected] = useState<number>(-1);
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
            const unit = new Character(
              c.id,
              c.name,
              c.hp,
              c.attack,
              c.img,
              c.panelId,
              c.attributes
            );
            units.push(unit);
            console.log(c.attributes);
            return unit;
          });
          return new Panel(panel.id, panel.x, panel.y, panelUnits);
        });
        return new Player(player.id, player.name, units, panels);
      });
      setPlayers(players);

      setLoading(false);
    });
  };

  useEffect(() => {
    fetchGameData();
  }, [currentUnit]);

  const response: FetchGameDataProps = {
    loading,
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

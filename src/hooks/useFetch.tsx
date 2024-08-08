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
  actionSelected: string | null;
  setActionSelected: (actionSelected: string | null) => void;
  targetSelected: string | null;
  setTargetSelected: (targetSelected :string | null) => void;
  lastAction: LastActionType;
  setLastAction: (lastAction: LastActionType) => void;
}

export type LastActionType = {
  sourceId: string | null;
  targetId: string | null;
  actionId: string | null;
  players: Player[];
  panels: Panel[];
};

export const useFetchGameData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<Player[]>([]);
  const [panels, setPanels] = useState<Panel[]>([]);
  const [currentUnit, setCurrentUnit] = useState<string>("");
  const [actionSelected, setActionSelected] = useState<string | null>(null);
  const [targetSelected, setTargetSelected] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<LastActionType>({
    sourceId: null,
    targetId: null,
    actionId: null,
    players: [],
    panels: [],
  });

  const fetchGameData = () => {
    axios.get(`${HOST}/start`).then((response) => {
      const playerData = response.data.players;
      const currentUnit = response.data.currentUnit;
      setCurrentUnit(currentUnit);

      const players: Player[] = playerData.map((player: any) => {
        let units: Character[] = player.characters.map((c: any) => new Character(c.id, c.img, c.attributes));
        console.log(units)
        /*const panels: Panel[] = player.panels.map((panel: any) => {
          const panelUnits = panel.storage.map((c: any) => {
            
            units.push(unit);
            return unit;
          });
          return new Panel(panel.id, panel.x, panel.y, panelUnits);
        });*/
        return new Player(player.id, player.name, units);
      });
      
      setPlayers(players);
      setPanels(response.data.panels.map((p: any) => new Panel(p.id, p.x, p.y, p.storage)))
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

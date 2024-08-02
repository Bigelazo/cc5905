import axios from "axios";
import { useEffect, useState } from "react";
import Character from "../model/Character";
import Panel from "../model/Panel";

interface FetchGameDataProps {
  loading: boolean;
  playerIds: string[];
  units: Character[];
  currentUnit: string;
  setCurrentUnit: (currentUnit: string) => void;
  actionSelected: number;
  setActionSelected: (actionSelected: number) => void;
}

export const useFetchGameData = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [playerIds, setPlayerIds] = useState<string[]>([]);
  const [units, setUnits] = useState<Character[]>([]);
  const [currentUnit, setCurrentUnit] = useState<string>("");
  const [actionSelected, setActionSelected] = useState<number>(-1);

  const fetchGameData = () => {
    axios.get(`${HOST}/start`).then((response) => {
      const players = response.data.parties;
      const playerIds = players.map((p: any) => p.id);
      setPlayerIds(playerIds);

      let units: Character[] = [];
      for (const player of players) {
        player.characters.forEach((c: any) => {
          units.push(
            new Character(c.id, c.name, c.hp, c.attack, c.img, c.mappableId)
          );
        });
      }
      setUnits(units);

      const currentUnit = response.data.currentUnit;
      setCurrentUnit(currentUnit);

      setLoading(false);
    });
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  const response: FetchGameDataProps = {
    loading,
    playerIds,
    units,
    currentUnit,
    setCurrentUnit,
    actionSelected,
    setActionSelected,
  };

  return response;
};

interface FetchGridDataProps {
  units: Character[];
  panels: Panel[];
}

export const useFetchGridData = (playerId: string, currentUnit: string) => {
  const [units, setUnits] = useState<Character[]>([]);
  const [panels, setPanels] = useState<Panel[]>([]);

  const loadGridData = () => {
    axios.get(`${HOST}/grid/${playerId}`).then((response) => {
      const data = response.data;
      const units: Character[] = data.units.map((c: any) => {
        return new Character(c.id, c.name, c.hp, c.attack, c.img, c.mappableId);
      });
      const panels: Panel[] = data.panels.map((p: any) => {
        return new Panel(p.id, p.x, p.y);
      });

      setUnits(units);
      setPanels(panels);
    });
  };

  useEffect(() => {
    loadGridData();
  }, [currentUnit]);

  const response: FetchGridDataProps = {
    units,
    panels,
  };

  return response;
};

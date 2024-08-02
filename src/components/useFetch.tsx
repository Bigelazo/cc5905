import axios from "axios";
import { useEffect, useState } from "react";
import Character from "../model/Character";
import Panel from "../model/Panel";
import Player from "../model/Player";

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
  console.log("returning response")
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
        const panelUnits = p.storage.map((c: any) => {
          return new Character(
            c.id,
            c.name,
            c.hp,
            c.attack,
            c.img,
            c.mappableId
          );
        });
        return new Panel(p.id, p.x, p.y, panelUnits);
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

interface FetchNewGameDataProps {
  loading: boolean;
  players: Player[];
  currentUnit: string;
  setCurrentUnit: (currentUnit: string) => void;
  actionSelected: number;
  setActionSelected: (actionSelected: number) => void;
}

export const useFetchNewGameData = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentUnit, setCurrentUnit] = useState<string>("");
  const [actionSelected, setActionSelected] = useState<number>(-1);

  const fetchNewGameData = () => {
    axios.get(`${HOST}/start`).then((response) => {
      const playerData = response.data.parties;
      const currentUnit = response.data.currentUnit;
      setCurrentUnit(currentUnit);

      const players: Player[] = playerData.map((player: any) => {
        let units: Character[] = [];
        const panels: Panel[] = player.panels.map((panel: any) => {
          const panelUnits: Character[] = panel.storage.map((c: any) => {
            if (c != null || c != undefined) {
              const unit = new Character(
                c.id,
                c.name,
                c.hp,
                c.attack,
                c.img,
                c.mappableId
              );
              units.push(unit);
            }
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
    fetchNewGameData();
  }, []);

  const response: FetchNewGameDataProps = {
    loading,
    players,
    currentUnit,
    setCurrentUnit,
    actionSelected,
    setActionSelected,
  };

  return response;
};

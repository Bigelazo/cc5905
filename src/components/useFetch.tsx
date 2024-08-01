import axios from "axios";
import { useEffect, useState } from "react";
import Character from "../model/Character";
import Panel from "../model/Panel";

const host = "http://localhost:8080";

export const useFetchGameData = () => {
  const [playerIds, setPlayerIds] = useState<string[]>([]);

  const fetchGameData = () => {
    axios.get(`${host}/start`).then((response) => {
      const players = response.data.parties;
      const playerIds = players.map((p: any) => p.id);
      setPlayerIds(playerIds);
    });
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  const response: [string[], React.Dispatch<React.SetStateAction<string[]>>] = [
    playerIds,
    setPlayerIds,
  ];

  return response;
};

export const useFetchCharacters = () => {};

export const useFetchPanels = () => {};

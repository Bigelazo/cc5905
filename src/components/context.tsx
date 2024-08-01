import axios from "axios";
import { ReactNode, createContext, useContext, useState } from "react";

interface CurrentUnitProps {
  currentUnit: string;
  setCurrentUnit: (s: string) => void;
}

export const CurrentUnitContext = createContext<CurrentUnitProps>({
  currentUnit: "",
  setCurrentUnit: (s) => {},
});

interface ActionSelectedProps {
  actionSelected: number;
  setActionSelected: (n: number) => void;
}

export const ActionSelectedContext = createContext<ActionSelectedProps>({
  actionSelected: 0,
  setActionSelected: (n) => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const CurrentUnitProvider = ({ children }: ProviderProps) => {
  console.log("Rendering CurrentUnitProvider");
  const [currentUnit, setCurrentUnit] = useState("");

  axios.get("http://localhost:8080/start").then((response) => {
    setCurrentUnit(response.data.currentUnit);
  });

  return (
    <CurrentUnitContext.Provider value={{ currentUnit, setCurrentUnit }}>
      {children}
    </CurrentUnitContext.Provider>
  );
};

export const ActionSelectedProvider = ({ children }: ProviderProps) => {
  const [actionSelected, setActionSelected] = useState(-1);

  return (
    <ActionSelectedContext.Provider
      value={{ actionSelected, setActionSelected }}
    >
      {children}
    </ActionSelectedContext.Provider>
  );
};

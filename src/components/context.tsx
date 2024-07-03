import { ReactNode, createContext, useContext, useState } from "react";

interface CurrentUnitProps {
  currentUnit: number;
  setCurrentUnit: (n: number) => void;
}

export const CurrentUnitContext = createContext<CurrentUnitProps>({
  currentUnit: 0,
  setCurrentUnit: (n) => {},
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
  const [currentUnit, setCurrentUnit] = useState(1);

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

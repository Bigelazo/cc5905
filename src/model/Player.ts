import Character from "./Character";
import Panel from "./Panel";

class Player {
  id: string;
  name: string;
  units: Character[];
  panels: Panel[];

  constructor(id: string, name: string, units: Character[], panels: Panel[]) {
    this.id = id;
    this.name = name;
    this.units = units;
    this.panels = panels;
  }
}

export default Player;
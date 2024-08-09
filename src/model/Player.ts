import Character from "./Character";
import Panel from "./Panel";

class Player {
  id: string;
  name: string;
  units: Character[];

  constructor(id: string, name: string, units: Character[]) {
    this.id = id;
    this.name = name;
    this.units = units;
  }
}

export default Player;
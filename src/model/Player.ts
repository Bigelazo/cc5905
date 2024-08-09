import Character from "./Character";

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

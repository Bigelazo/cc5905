import Character from "./Character";

class Panel {
  id: string;
  x: number;
  y: number;
  storage: Character[] = [];

  constructor(id: string, x: number, y: number, storage: Character[]) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.storage = storage;
  }
}

export default Panel;
import Character from "./Character";

class Panel {
  id: string;
  x: number;
  y: number;
  storage: string[] = [];

  constructor(id: string, x: number, y: number, storage: string[]) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.storage = storage;
  }
}

export default Panel;
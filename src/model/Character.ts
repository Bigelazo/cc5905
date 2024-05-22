class Character {
  id: number;
  name: string;
  hp: number;
  atk: number;
  isDefeated: boolean;
  mappableId: number | null;

  constructor(id: number, name: string, hp: number, atk: number, mappableId: number | null) {
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.isDefeated = false;
    this.mappableId = mappableId;
  }
}

export default Character;
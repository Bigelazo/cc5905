class Character {
  id: string;
  name: string;
  hp: number;
  atk: number;
  img: string;
  isDefeated: boolean;
  mappableId: string | null;

  constructor(id: string, name: string, hp: number, atk: number, img: string, mappableId: string | null) {
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.img = img;
    this.isDefeated = false;
    this.mappableId = mappableId;
  }
}

export default Character;
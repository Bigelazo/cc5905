class Character {
  id: number;
  name: string;
  hp: number;
  atk: number;
  img: string;
  isDefeated: boolean;
  mappableId: number | null;


  constructor(id: number, name: string, hp: number, atk: number, img: string, mappableId: number | null) {
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
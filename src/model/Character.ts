class Character {
  id: number;
  name: string;
  hp: number;
  atk: number;
  img: string;
  isDefeated: boolean;

  constructor(id: number, name: string, hp: number, atk: number, img: string) {
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.img = img;
    this.isDefeated = false;
  }
}

export default Character;
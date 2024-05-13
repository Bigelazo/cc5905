class Character {
  id: number;
  name: string;
  hp: number;
  atk: number;
  isDefeated: boolean;

  constructor(id: number, name: string, hp: number, atk: number) {
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.isDefeated = false;
  }
}

export default Character;
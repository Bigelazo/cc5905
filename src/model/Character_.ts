class Character_ {
  name: string;
  hp: number;
  atk: number;
  isDefeated: boolean;

  constructor(name: string, hp: number, atk: number) {
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.isDefeated = false;
  }
}

export default Character_;
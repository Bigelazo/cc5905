class Character {
  id: string;
  name: string;
  hp: number;
  atk: number;
  img: string;
  isDefeated: boolean;
  panelId: string | null;
  attributes: { [key: string]: any };

  constructor(id: string, name: string,
    hp: number, atk: number,
    img: string,
    panelId: string | null,
    attributes: { [key: string]: any }) {
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.img = img;
    this.isDefeated = false;
    this.panelId = panelId;
    this.attributes = attributes;
  }
}

export default Character;
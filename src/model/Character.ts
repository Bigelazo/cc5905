class Character {
  id: string;
  img: string;
  attributes: { [key: string]: string };

  constructor(id: string, img: string, attributes: { [key: string]: string }) {
    this.id = id;
    this.img = img;
    this.attributes = attributes;
  }
}

export default Character;

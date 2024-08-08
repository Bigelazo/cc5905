class Character {
  id: string;
  img: string;
  attributes: [{'name': string, 'value': string }];

  constructor(id: string, img: string, attributes: [{'name': string, 'value': string }]) {
    this.id = id;
    this.img = img;
    this.attributes = attributes;
  }
}

export default Character;

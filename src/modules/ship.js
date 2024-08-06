export default class Ship {
  constructor(length) {
    this.length = length;
    this.hitsReceived = 0;
    this.shipStatus = 'Floating';
  }

  getLength() {
    return this.length;
  }

  hit() {
    this.hitsReceived += 1;
  }

  isSunk() {
    if (this.length === this.hitsReceived) {
      this.shipStatus = 'Sunk';
    }
  }
}

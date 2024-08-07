export default class Ship {
  constructor(length) {
    this.length = length;
    this.hitsReceived = 0;
    this.sunk = false;
  }

  getLength() {
    return this.length;
  }

  hit() {
    this.hitsReceived += 1;
    this.isSunk();
  }

  isSunk() {
    if (this.length === this.hitsReceived) {
      this.sunk = true;
    }
  }
}

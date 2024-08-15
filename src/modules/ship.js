export default class Ship {
  constructor(length) {
    this.length = length;
    this.hitsReceived = 0;
    this.orientation = '';
    this.sunk = false;
  }

  getHitsReceived() {
    return this.hitsReceived;
  }
  getSunkStatus() {
    return this.sunk;
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

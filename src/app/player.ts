interface Card {
  rank?: number;
  unmount?: any;
}
   
export class Player {
  public sum = 0;

  constructor(
    public id: number,
    public name: string,
    public hand: Array<Object>,
    public human: boolean,
    public stand: boolean) { }

  reset() {
    let card: Card = this.hand.shift();
    while (card) {
      card.unmount();
      card = this.hand.shift();
    }
    this.hand = [];
    this.stand = false;
    this.sum = 0;
  }

  computeSum() {
    this.sum = this.hand.map((card: Card) => {
      if ([11, 12, 13].indexOf(card.rank) != -1) {
        return 10
      }
      return card.rank
    }).reduce((previous, current) => previous + current, 0);

    return this.sum;
  }
}

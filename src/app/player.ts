interface Card {
  rank?: number;
}
   
export class Player {
  public sum = 0;

  constructor(
    public id: number,
    public name: string,
    public hand: Array<Object>,
    public human: boolean,
    public stand: boolean) { }

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

import { Component, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DeckComponent } from './deck.component'
import { PlayerComponent } from './player.component'
import { Player } from './player'

declare var Deck: any;

const PLAYER_HAND_MARGIN: number = 5;
const PLAYER_HIT_DURATION: number = 1000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(DeckComponent) viewDeck: DeckComponent;
  @ViewChildren(PlayerComponent) playerComponents: QueryList<PlayerComponent>;
  id = 0;
  title = 'app works!';
  deck = new Deck();
  players = [];
  activePlayer = this.players[0];

  constructor(public dialog: MdDialog) {
    this.players.push(new Player(this.id++, 'Computer', [], false, false))
  }

  ngAfterViewInit() {
    this.newGame()
  }

  newGame() {
    this.deck = new Deck()
    this.viewDeck.mount(this.deck)
    this.deck.cards.forEach(function (card, i) {
      card.setSide('back')
    })
    this.deck.shuffle()
    this.players.forEach(player => player.reset())
  }

  shuffle() {
    this.deck.shuffle()
  }

  onHit(event) {
    this.hit(event.player, event.offset)
  }

  hit(player, offset) {
    const card = this.deck.cards.shift(); 
    player.hand.push(card);
    const offsetDeck = this.viewDeck.offset()
    card.animateTo({
      delay: 0,
      duration: PLAYER_HIT_DURATION,
      x: offset.left - offsetDeck.left + (card.$el.offsetWidth + PLAYER_HAND_MARGIN) * player.hand.length,
      y: offset.top - offsetDeck.top + card.$el.offsetHeight,
      onComplete: () => {
        card.setSide('front');
        player.computeSum();
      }
    })
  }

  onStand(player: Player) {
    player.stand = true;
    this.activateNextPlayer(player);
  }

  activatePlayer(player: Player) {
    this.activePlayer = player;

    if (this.activePlayer.human === true) {
      return
    }

    const activePlayerComponent = this.playerComponents.find(component => component.player === this.activePlayer)

    while (this.activePlayer.computeSum() < 15) {
      this.hit(this.activePlayer, activePlayerComponent.offset())
    }

    this.activateNextPlayer(player);
  }

  activateNextPlayer(player) {
    const index = this.players.indexOf(player) + 1
    const next = this.players[index]

    if (!next) {
      alert('Game Over!')
      return
    }

    this.activatePlayer(next)
  }

  startGame() {
    this.activatePlayer(this.players[0])
  }

  addPlayer(human: boolean) {
    this.players.push(new Player(this.id++, (human ? 'Human' : 'Computer'), [], human, false))
  }
}

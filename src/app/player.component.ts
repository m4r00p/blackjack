import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Player } from './player'

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  @Input() player: Player;
  @Output() onHit = new EventEmitter();
  @Output() onStand = new EventEmitter();
  ref: ElementRef;

  constructor(ref: ElementRef) {
    this.ref = ref;
  }

  hit() {
    const nativeElement = this.ref.nativeElement;
    this.onHit.emit({
      player: this.player,
      offset: {
        top: nativeElement.offsetTop,
        left: nativeElement.offsetLeft,
      }
    })
  }

  stand() {
    this.onStand.emit(this.player)
  }

  offset() {
    const element = this.ref.nativeElement;
    return {
      top: element.offsetTop,
      left: element.offsetLeft
    }
  }
}

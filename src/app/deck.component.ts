import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent {
  ref: ElementRef;

  constructor(el: ElementRef) {
    this.ref = el;
  }

  mount(deck) {
    deck.mount(this.ref.nativeElement.querySelector('.deck-placeholder'))
  }

  offset() {
    const element = this.ref.nativeElement.querySelector('.deck-placeholder')
    return {
      top: element.offsetTop,
      left: element.offsetLeft
    }
  }

}

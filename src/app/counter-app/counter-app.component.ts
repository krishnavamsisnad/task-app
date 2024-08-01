import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-counter-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-app.component.html',
  styleUrl: './counter-app.component.css'
})
export class CounterAppComponent {
  counters: { id: number, count: number }[] = [];
  @Output() counterCountChange = new EventEmitter<number>();

  
  addCounter() {
    this.counters.push({ id: Date.now(), count: 0 });
    this.updateCounterCount();
  }

  increment(counter: { id: number, count: number }) {
    counter.count++;
    this.updateCounterCount();
  }

  decrement(counter: { id: number, count: number }) {

    if (counter.count> 0) {
      counter.count--;
    }
    this.updateCounterCount();
  }

  deleteCounter(counter: { id: number, count: number }) {
    this.counters = this.counters.filter(c => c.id !== counter.id);
    this.updateCounterCount();
  }

  resetAll() {
    this.counters = [];
    this.updateCounterCount();
  }

  public updateCounterCount() {
    this.counterCountChange.emit(this.counters.length);
  }

  
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { WeatherrserivcesService } from '../weatherrserivces.service';
import { Counter } from '../chatmodel';

@Component({
  selector: 'app-counter-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-app.component.html',
  styleUrl: './counter-app.component.css'
})
export class CounterAppComponent {
  counters: Counter[] = [];
  counterId = 0;

  constructor(private counterService: WeatherrserivcesService) {}

  addCounter() {
    this.counters.push({ id: this.counterId++, count: 0 });
    this.updateNavbarCount();
  }

  increment(counter: Counter) {
 
    counter.count++;
  }

  decrement(counter: Counter) {
    if(counter.count>0){
      counter.count--;
 
    }
  }

  deleteCounter(counter: Counter) {
    this.counters = this.counters.filter(c => c.id !== counter.id);
    this.updateNavbarCount();
  }

  resetCounters() {
    this.counters = [];
    this.updateNavbarCount();
  }

  updateNavbarCount() {
    this.counterService.updateCounterCount(this.counters.length);
  }
  
}

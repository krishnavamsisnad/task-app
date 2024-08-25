import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WeatherrserivcesService } from '../weatherrserivces.service';
import { Counter } from '../chatmodel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-app.component.html',
  styleUrl: './counter-app.component.css'
})
export class CounterAppComponent {
  counterId = 0;

  constructor(public counterService: WeatherrserivcesService) {}

  addCounter() {
    // const count_data:any = this.counterService.counterData$.value;
    // const updated_data = [...count_data, { id: this.counterId++, count: 0 }];
    // this.counterService.counterData$.next(updated_data);
    this.counterService.counter_data.update((value) => [...value, { id: this.counterId++, count: 0 }]);
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
    // const count_data = this.counterService.counterData$.value
    // this.counterService.counterData$.next(count_data.filter(c => c.id !== counter.id));
    this.counterService.counter_data.update((value) => value.filter(c => c.id !== counter.id));
  }

  resetCounters() {
    // this.counterService.counterData$.next([]);
    this.counterService.counter_data.update((value) => []);
  }
  
}

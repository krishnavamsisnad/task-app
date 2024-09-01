import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store'; 
import { selectAllCounters } from '../store/common.selectors'; 
import { Counter } from '../chatmodel'; 
import { CoungterActions } from '../store/common.actions'; 

@Component({
  selector: 'app-counter-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter-app.component.html',
  styleUrls: ['./counter-app.component.css']
})
export class CounterAppComponent {

  counterId = 0;
  counters$ = this.store.select(selectAllCounters); 

  constructor(private store: Store) {} 

  addCounter() {
    const newCounter: Counter = { id: this.counterId++, count: 0 };
    this.store.dispatch(CoungterActions.addCounter({ counter: newCounter })); 
  }

  increment(counter: Counter) {
    this.store.dispatch(CoungterActions.incrementCounter({ id: counter.id })); 
  }

  decrement(counter: Counter) {
    this.store.dispatch(CoungterActions.decrementCounter({ id: counter.id })); 
  }

  deleteCounter(counter: Counter) {
    this.store.dispatch(CoungterActions.deleteCounter({ id: counter.id }));
  }

  resetCounters() {
    this.store.dispatch(CoungterActions.resetCounter()); 
  }
}










  //counterId = 0;

 // constructor(public counterService: WeatherrserivcesService) {}

  // addCounter() {
  //   // const count_data:any = this.counterService.counterData$.value;
  //   // const updated_data = [...count_data, { id: this.counterId++, count: 0 }];
  //   // this.counterService.counterData$.next(updated_data);
  //   this.counterService.counter_data.update((value) => [...value, { id: this.counterId++, count: 0 }]);
  // }

  // increment(counter: Counter) {
  //   counter.count++;
  // }

  // decrement(counter: Counter) {
  //   if(counter.count>0){
  //     counter.count--;
  //   }
  // }

  // deleteCounter(counter: Counter) {
  //   // const count_data = this.counterService.counterData$.value
  //   // this.counterService.counterData$.next(count_data.filter(c => c.id !== counter.id));
  //   this.counterService.counter_data.update((value) => value.filter(c => c.id !== counter.id));
  // }

  // resetCounters() {
  //   // this.counterService.counterData$.next([]);
  //   this.counterService.counter_data.update((value) => []);
  // }
  


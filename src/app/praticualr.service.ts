import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { List } from './chatmodel';

@Injectable({
  providedIn: 'root'
})
export class PraticualrService {
  pasingsdata$= new Subject<number>
  passingdata$=new BehaviorSubject<List[]>([])
  listdata=signal<List[]>([])
  constructor() { }
  emitValue(value: number) {
    this.pasingsdata$.next(value);
  }

}

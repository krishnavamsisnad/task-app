import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { List } from './chatmodel';

@Injectable({
  providedIn: 'root'
})
export class PraticualrService {

  passingdata$=new BehaviorSubject<List[]>([])
  listdata=signal<List[]>([])
  constructor() { }

}

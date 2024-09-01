import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherrserivcesService } from '../weatherrserivces.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Counter } from '../chatmodel';
import { Store } from '@ngrx/store';
import { selectAllCounters } from '../store/common.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  counterCount$: Observable<number>;

  constructor(private store: Store) {
    this.counterCount$ = this.store.select(selectAllCounters).pipe(
      map((counters: string | any[]) => counters.length)
    );
  }

}

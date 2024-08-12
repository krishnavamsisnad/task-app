import { Component,  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherrserivcesService } from '../weatherrserivces.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Counter, List } from '../chatmodel';
import { PraticualrService } from '../praticualr.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  counterCount$!: Observable<Counter[]>;
  listdata$!:Observable<List[]>

  constructor(public counterService: WeatherrserivcesService,public tolist:PraticualrService) {}

  ngOnInit() {
    this.counterCount$ = this.counterService.counterData$;
    this.listdata$=this.tolist.passingdata$
  }
  
}

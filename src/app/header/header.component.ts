import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherrserivcesService } from '../weatherrserivces.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  counterCount: number = 0;

  constructor(private counterService: WeatherrserivcesService) {}

  ngOnInit() {
    this.counterService.counterCount$.subscribe(count => {
      this.counterCount = count;
    });
  }
  
}

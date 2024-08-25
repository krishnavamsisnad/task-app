import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeatherrserivcesService } from '../weatherrserivces.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Counter } from '../chatmodel';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public counterService: WeatherrserivcesService) {}
  
}

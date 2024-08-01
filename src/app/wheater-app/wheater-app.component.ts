import { Component, OnInit } from '@angular/core';
import { WeatherrserivcesService } from '../weatherrserivces.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-wheater-app',
  standalone: true,
  imports: [CommonModule,FormsModule],
  providers: [WeatherrserivcesService, HttpClient],
  templateUrl: './wheater-app.component.html',
  styleUrl: './wheater-app.component.css'
})
export class WheaterAppComponent implements OnInit{
  city: string = '';
  recentLocations: { city: string, temperature: number, weather: string, icon: string }[] = [];
  errorMessage: string = '';
  historyData:any
  constructor(public http:WeatherrserivcesService){}
  ngOnInit(){
  }

  addCity() {
    this.http.getWeather(this.city).subscribe({
      next: (data: any) => {
        console.log(data)
        if (data) {
          this.recentLocations.unshift({
            city: this.city,
            temperature: data.main.temp,
            weather: data.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
          });
          this.city = '';
          this.errorMessage = '';
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'City not found';
      }
    }
    );
  }

  refreshWeather(location: { city: string }) {
    this.http.getWeather(location.city).subscribe(
      data => {
        if (data) {
          console.log(data)
          const index = this.recentLocations.findIndex(loc => loc.city === location.city);
          this.recentLocations[index] = {
            city: location.city,
            temperature: data.main.temp,
            weather: data.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
          };
        }
      }
    );
  }

  removeLocation(location: { city: string }) {
    this.recentLocations = this.recentLocations.filter(loc => loc.city !== location.city);
  }

  getHistory(lat: number, lon: number): void {
    this.http.getHistory(lat, lon).subscribe(data => {
      this.historyData = data;
      console.log(this.historyData)
    });
  }
}

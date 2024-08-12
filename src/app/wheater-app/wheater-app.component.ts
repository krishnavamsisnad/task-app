import { Component, OnInit } from '@angular/core';
import { WeatherrserivcesService } from '../weatherrserivces.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Forecast } from './wheater-app.model';

@Component({
  selector: 'app-wheater-app',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [WeatherrserivcesService, HttpClient],
  templateUrl: './wheater-app.component.html',
  styleUrls: ['./wheater-app.component.css']
})
export class WheaterAppComponent implements OnInit {
  cityName: string = '';
  cities: { id: number, name: string, temperature: number, icon: string }[] = [];
  forecast :Forecast| null=null;
  errorMessage: string = '';
  weatherdata=[]
  selectedCity: any;
  searchTerm: string = '';

  constructor(public http: WeatherrserivcesService) { }

  ngOnInit() {
 }

  addCity() {
    this.http.getWeather(this.cityName).subscribe({
      next: data => {
    this.weatherdata=data
    console.log(data)

        const city = {
          id: data.id,
          name:data.name,
          temperature: data.main.temp,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        };
       console.log(city)
        if (this.cities.length >= 8) {
          this.cities.pop();
        }
        this.cities.unshift(city);
        this.cityName = '';
        this.errorMessage = '';
        console.log(this.cities)
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'City not found';
      }
    });

  }

  refreshCity(city: any, event: Event) {
    event.stopPropagation();
    this.http.getWeather(city.name).subscribe({
      next: data => {
        city.temperature = data.main.temp;
        city.icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      },
      error: (error: HttpErrorResponse) => {
        alert('Failed to refresh city');
      }
    });
  }

  removeCity(city: any, event: Event) {
    event.stopPropagation();
    this.cities = this.cities.filter(c => c !== city);
  }

  clearCities() {
    this.cities = [];
    this.forecast = null;
  }

  selectCity(city: any) {
    if (city && city.name) {
      this.selectedCity = city;
  
      this.http.getForecast(city.id).subscribe({
        next: (data: Forecast) => {
          this.forecast = data;
          console.log(this.forecast)
        },
        error: (error: HttpErrorResponse) => {
          alert('Failed to load forecast');
          console.error('Failed to load forecast:', error);
        }
      });
    } else {
      alert('Invalid city selected');
    }
  }
  
  refresshCity(city: any, event: Event) {
    event.stopPropagation();
    this.http.getWeather(city.name).subscribe({
      next: data => {
        city.temperature = data.main.temp;
        city.icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      },
      error: (error: HttpErrorResponse) => {
        alert('Failed to refresh city');
      }
    });
  }
  filteredCities() {
    return this.cities.filter(city =>
      city.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

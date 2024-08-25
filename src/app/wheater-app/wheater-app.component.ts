import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherrserivcesService } from '../weatherrserivces.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { KelvinToCelsiusPipe } from '../celsius.pipe';
import { SearchpipePipe } from '../searchpipe.pipe';

@Component({
  selector: 'app-wheater-app',
  standalone: true,
  imports: [CommonModule, FormsModule, KelvinToCelsiusPipe,SearchpipePipe],
  providers: [WeatherrserivcesService],
  templateUrl: './wheater-app.component.html',
  styleUrls: ['./wheater-app.component.css']
})
export class WheaterAppComponent implements OnDestroy {
  cityName: string = '';
  errorMessage: string = '';
  weatherdata=[]
  selectedCity: any;
  apiSubscription!: Subscription;
  searchTerm: string = '';

  constructor(public http: WeatherrserivcesService) { }

  addCity() {
    if(this.cityName === ''){
      return
    }
    this.apiSubscription = this.http.getCityForecast(this.cityName).subscribe({
      next: data => {
        if (data.cod === '200' && data.city.name.toLowerCase() === this.cityName.toLowerCase()) {
          let citiesData = this.http.cities_data(); 
          console.log("Current cities:", citiesData);
        
          if (citiesData.length >= 8) {
            citiesData.pop();
            console.log("Removed the last city, new list:", citiesData);
          }
        
          citiesData = [data, ...citiesData]; 
          this.http.cities_data.set(citiesData)
          console.log("Updated cities list:", citiesData);
        
          this.selectedCity = data;
          this.cityName = '';
          this.errorMessage = ''; 
          console.log("City added successfully. Selected city:", this.selectedCity);
        }
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

  removeCity(cityid: string, event: Event) {
    event.stopPropagation();
    console.log(this.selectedCity);
    if(this.selectedCity.city.id === cityid) {
      this.selectedCity = null;
     }
   this.http.cities_data.update ((value) => value.filter((c:any) => c.city.id !== cityid));
  }

  clearCities() {
    this.http.cities_data.update((val) => []);
  }

  selectCity(city: any) {
      this.apiSubscription = this.http.getForecast(city.coord.lat, city.coord.lon).subscribe({
        next: (data: any) => {
          if(data.cod === '200' && data.city.name.toLowerCase() === city.name.toLowerCase()){
          // Get the current cities list from the BehaviorSubject
      const cities = this.http.cities_data();
      
      // Find the index of the city in the array
      const cityIndex = cities.findIndex((t: any) => t.city.id === city.id);
      
      if (cityIndex !== -1) {
        // Update the city data at the found index
        cities[cityIndex] = data;
        
        // Emit the updated cities list
        this.http.cities_data.update(() => cities);
        
        // Update the selected city
        this.selectedCity = data;

        // Debug logs (can be removed in production)
        console.log(this.selectedCity, cities);
      }          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Failed to load forecast:', error);
        }
      });
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

  convertToDate(timestamp: number): Date {
    return new Date(timestamp * 1000); // Convert seconds to milliseconds
  }

  ngOnDestroy(): void {
    if(this.apiSubscription){
      this.apiSubscription.unsubscribe();
    }
  }
  
  
  
}

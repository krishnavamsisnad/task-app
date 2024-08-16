import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherrserivcesService } from '../weatherrserivces.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';
import { KelvinToCelsiusPipe } from '../celsius.pipe';

@Component({
  selector: 'app-wheater-app',
  standalone: true,
  imports: [CommonModule, FormsModule, KelvinToCelsiusPipe],
  providers: [WeatherrserivcesService, HttpClient],
  templateUrl: './wheater-app.component.html',
  styleUrls: ['./wheater-app.component.css']
})
export class WheaterAppComponent implements OnInit, OnDestroy {
  cityName: string = '';
  cities = new BehaviorSubject<any>([]);
  errorMessage: string = '';
  weatherdata=[]
  selectedCity: any;
  apiSubscription!: Subscription;
  searchTerm: string = '';

  constructor(public http: WeatherrserivcesService) { }

  ngOnInit() {
 }

  addCity() {
    if(this.cityName === ''){
      return
    }
    this.apiSubscription = this.http.getCityForecast(this.cityName).subscribe({
      next: data => {
        if (data.cod === '200' && data.city.name.toLowerCase() === this.cityName.toLowerCase()) {
          let citiesData = this.cities.value; 
          console.log("Current cities:", citiesData);
        
          if (citiesData.length >= 8) {
            citiesData.pop();
            console.log("Removed the last city, new list:", citiesData);
          }
        
          citiesData = [data, ...citiesData]; 
          this.cities.next(citiesData); 
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
   const updatedCities= this.cities.next(this.cities.value.filter((c:any) => c.city.id !== cityid));
    this.cities.next(updatedCities); 
  }

  clearCities() {
    this.cities.next([]);
  }

  selectCity(city: any) {
    console.log(city);
      this.apiSubscription = this.http.getForecast(city.coord.lat, city.coord.lon).subscribe({
        next: (data: any) => {
          if(data.cod === '200' && data.city.name.toLowerCase() === city.name.toLowerCase()){
          // Get the current cities list from the BehaviorSubject
      const cities = this.cities.getValue();
      
      // Find the index of the city in the array
      const cityIndex = cities.findIndex((t: any) => t.city.id === city.id);
      
      if (cityIndex !== -1) {
        // Update the city data at the found index
        cities[cityIndex] = data;
        
        // Emit the updated cities list
        this.cities.next(cities);
        
        // Update the selected city
        this.selectedCity = data;

        // Debug logs (can be removed in production)
        console.log(this.selectedCity, cities);
      }
      
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Failed to load forecast:', error);
        }
      });
  }
  
  filteredCities() {
    return this.cities.value.filter((city: any) =>
      city.city.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
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

  ngOnDestroy(): void {
    if(this.apiSubscription){
      this.apiSubscription.unsubscribe();
    }
  }
  
  
  
}

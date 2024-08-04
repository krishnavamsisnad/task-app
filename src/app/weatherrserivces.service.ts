import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherrserivcesService {
   
  private apiKey = 'd4594364698122bfd1c4b3eb5f2ff19f';
  // private historyApiUrl = 'https://history.openweathermap.org/data/2.5/history/city';

   private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  apiUrl = environment.ApiUrl;
  

  constructor(

    public http:HttpClient
  ) { }


  getWeather(city: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${city}&appid=${this.apiKey}`);
  }
  // getForecast(cityId: number): Observable<any> {
  //   const startDate = Math.floor(Date.now() / 1000) - 7 * 24 * 3600; // 7 days ago
  //   const endDate = Math.floor(Date.now() / 1000); // now
  //   return this.http.get(`${this.forecastUrl}?id=${cityId}&type=hour&start=${startDate}&end=${endDate}&appid=${this.apiKey}`);
  // }
  // getForecast(cityId: number): Observable<any> {
  //   return this.http.get<any>(`${this.forecastUrl}?id=${cityId}&appid=${this.apiKey}&units=metric`);
  // }

  private counterCount = new BehaviorSubject<number>(0);

  counterCount$ = this.counterCount

  updateCounterCount(count: number) {
    this.counterCount.next(count);
  }

}

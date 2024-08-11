import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './environment/environment';
import { Counter } from './chatmodel';

@Injectable({
  providedIn: 'root'
})
export class WeatherrserivcesService {
   
  private apiKey = 'd4594364698122bfd1c4b3eb5f2ff19f';
  // private historyApiUrl = 'https://history.openweathermap.org/data/2.5/history/city';

   private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  apiUrl = environment.ApiUrl;

  counterData$ = new BehaviorSubject<Counter[]>([]);
  counter_data = signal<Counter[]>([]);



   


  constructor(public http:HttpClient) { }

  getWeather(city: string): Observable<any> {
    return this.http.get<any>(`${environment.ApiUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
  }

  getForecast(cityId: number): Observable<any> {
    return this.http.get<any>(`${this.forecastUrl}?id=${cityId}&appid=${this.apiKey}&units=metric`);
  }


}

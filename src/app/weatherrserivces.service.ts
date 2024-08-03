import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherrserivcesService {
   
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'd4594364698122bfd1c4b3eb5f2ff19f';
  private historyApiUrl = 'https://history.openweathermap.org/data/2.5/history/city';

 
  

  constructor(

    public http:HttpClient
  ) { }


  getWeather(city: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${city}&appid=${this.apiKey}`);
  }
  getHistory(lat: number, lon: number): Observable<any> {
    return this.http.get<any>(`${this.historyApiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`);
  }

  private counterCount = new BehaviorSubject<number>(0);

  counterCount$ = this.counterCount

  updateCounterCount(count: number) {
    this.counterCount.next(count);
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpipe',
  standalone: true
})
export class SearchpipePipe implements PipeTransform {

  transform(cities: any[], searchTerm: string): any[] {
    if (!cities || !searchTerm) {
      return cities;
    }

    return cities.filter(city =>
      city.city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}

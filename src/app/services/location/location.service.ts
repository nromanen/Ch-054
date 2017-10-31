import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LocationService {

  constructor(private http: Http) { }

  getAllLocations(){
    return this.http.get('/api/locations/get')
    .map(res => res.json());
  }

}

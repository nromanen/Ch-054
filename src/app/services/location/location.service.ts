import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { EventLocation } from '../../module_ts/location';

@Injectable()
export class LocationService {
  constructor(private http: Http) { }

  getAllLocations() {
    return this.http.get('/api/locations/get')
      .map(res => res.json());
  }

  getLocation(locationId: number) {
    return this.http.get('/api/locations/get/' + locationId)
      .map(res => res.json());
  }

  getLocationPhotos(locationId: number) {
    return this.http.get('/api/locations/photos/get/' + locationId)
      .map(res => res.json());
  }

  saveLocation(location: EventLocation) {
    return this.http.post('/api/locations/post', location)
      .map(res => res.json())
      .subscribe(id => {
        this.saveLocationPhoto(id[0].id, location.photos);
      });
  }

  saveLocationPhoto(locationId: number, photos: Array<Array<String>>) {
    photos.forEach(photo => {
      let body = {
        locId: locationId,
        locPhoto: photo[1]
      }
      this.http.post('/api/locations/post/photo', body).subscribe();
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Fleet {
  fleet: {
    x: [],
    y: [],
    width: [],
    height: [],
    ycanvasoccup: []
  }
}

@Injectable({
  providedIn: 'root'
})
export class DatagameService {

  constructor(private http: HttpClient) { }

  getFleetToDraw(): Observable<Fleet> {
    return this.http.post<Fleet>('http://localhost:3000/datafleet', {}).pipe(map((data) => {
      if (data) {
        return data;
      } else {
        throw new Error('Value expected!');
      }
    }));
  }

  getDataRFleet(user: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/getdatafleetr', {user: user}).pipe(map((data) => {
      console.log('getDataRFleet: ', data);
      if (data) {
        return data;
      } else {
        throw new Error('Value expected!');
      }
    }));
  }

  sendFleetRandomPos(fleetRandom: any): Observable<any> {
    // console.log('fleetRandom', fleetRandom);
    return this.http.post<any>('http://localhost:3000/addrandfleet', fleetRandom).pipe(map((data) => {
      if (data) {
        return data;
      } else {
        throw new Error('Value expected!');
      }
    }));
  }

}

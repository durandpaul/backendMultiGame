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
  // Changer avant remise sur Heroku
  // private host: string = 'http://localhost:3000';


  constructor(private http: HttpClient) { }

  getFleetToDraw(): Observable<Fleet> {
    return this.http.post<Fleet>('/datafleet', {}).pipe(map((data) => {
      if (data) {
        return data;
      } else {
        throw new Error('Value expected!');
      }
    }));
  }

  getDataRFleet(user: string): Observable<any> {
    return this.http.post<any>('/getdatafleetr', {user: user}).pipe(map((data) => {
      if (data) {
        return data;
      } else {
        throw new Error('Value expected!');
      }
    }));
  }

  sendFleetRandomPos(fleetRandom: any): Observable<any> {
    return this.http.post<any>('/addrandfleet', fleetRandom).pipe(map((data) => {
      if (data) {
        return data;
      } else {
        throw new Error('Value expected!');
      }
    }));
  }

}

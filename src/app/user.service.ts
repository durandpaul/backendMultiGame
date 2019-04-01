import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

interface User {
  user : {
    _id: string,
    email: any,
    username: string,
    password: string,
    score: number
  }
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  newUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/newuser', user).pipe(map( (data) => {
      if (data) {
        return data;
      } else {
        throw new Error('Value expected!');
      }
    }));
  }

  getUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/login', user).pipe(map( (data) => {
      console.warn('getUser data', data.user._id);
      if (data.user._id !== undefined) {
        localStorage.setItem('currentUserId', data.user._id) ;
        localStorage.setItem('currentUsername', data.user.username) ;
        return data;
      } else {
        throw new Error('Value expected!');
      }
    })) ;
  }

}

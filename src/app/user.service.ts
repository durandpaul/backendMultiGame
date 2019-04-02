import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
  user: {
    _id: string,
    email: any,
    username: string,
    password: string,
    score: number,
    win: number,
    loose: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  newUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/newuser', user).pipe(map((data) => {
      if (data) {
        return data;
      } else {
        throw new Error('Value expected!');
      }
    }));
  }

  login(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/login', user).pipe(map((data) => {
      if (data.user._id !== undefined) {
        sessionStorage.setItem('currentUserId', data.user._id);
        sessionStorage.setItem('currentUsername', data.user.username);
        return data;
      } else {
        throw new Error('Value expected!');
      }
    }));
  }

  getUser(username: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/getuser', {username: username}).pipe(map((data) => {
      if (data.user._id !== undefined) {
        return data;
      } else {
        throw new Error('Value expected!');
      }
    }));
  }

}

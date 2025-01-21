import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: { emailId: string; password: string }): Observable<any> {
    return this.http.post('https://projectapi.gerasim.in/api/UserApp/login', credentials);
  }
}

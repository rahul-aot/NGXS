import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(token: string): Observable<any[]> {
    return this.http.get<any[]>('/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
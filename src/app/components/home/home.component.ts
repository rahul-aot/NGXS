import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '../../store/auth/auth.state';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  emailId$: Observable<string | null>; // Declare as Observable
  token$: Observable<string | null>; // Declare as Observable

  constructor(private store: Store) {
    // Initialize observables in the constructor
    this.emailId$ = this.store.select(AuthState.emailId);
    this.token$ = this.store.select(AuthState.token);
  }
}

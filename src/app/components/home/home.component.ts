import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '../../store/auth/auth.state';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  username$: Observable<string | null>; // Declare as Observable
  token$: Observable<string | null>; // Declare as Observable

  constructor(private store: Store) {
    // Initialize observables in the constructor
    this.username$ = this.store.select(AuthState.username);
    this.token$ = this.store.select(AuthState.token);
  }
}

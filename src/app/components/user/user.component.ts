import { Component } from '@angular/core';
import { UsersState } from '../../store/user.state';
import { Store } from '@ngxs/store';
import { UsersActions } from '../../store/user.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  users$: Observable<any[]>; // Declare as Observable
  loading$: Observable<boolean>; // Declare as Observable

  constructor(private store: Store) {
    // Initialize observables in the constructor
    this.users$ = this.store.select(UsersState.users);
    this.loading$ = this.store.select(UsersState.loading);
  }

  loadUsers() {
    this.store.dispatch(new UsersActions.GetUsers());
  }
}

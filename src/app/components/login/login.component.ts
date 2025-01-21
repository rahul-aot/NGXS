import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthActions } from '../../store/auth/auth.actions';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ FormsModule, AsyncPipe, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username  = '';
  password  = '';
  error$: Observable<any>; // Declare as Observable

  constructor(private store: Store, private router: Router) {
    // Initialize observables in the constructor
    this.error$ = this.store.select(state => state.auth.error);
  }
  onSubmit() {
    debugger
    this.store.dispatch(new AuthActions.Login({
      username: this.username,
      password: this.password
    })).subscribe(() => {
      debugger
      const isAuthenticated = this.store.selectSnapshot(state => state.auth.token);
      if (isAuthenticated) {
        this.router.navigate(['/home']);
      }
    });
  }
}

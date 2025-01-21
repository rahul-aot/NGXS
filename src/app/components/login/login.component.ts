import { Component } from '@angular/core';
import { AuthState } from '../../store/auth.state';
import { Store } from '@ngxs/store';
import { AuthActions } from '../../store/auth.actions';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  $error : boolean false;
  username = '';
  password = '';
  error$ = this.store.select(AuthState.error);

  constructor(private store: Store) {}

  onSubmit() {
    this.store.dispatch(new AuthActions.Login({
      username: this.username,
      password: this.password
    }));
  }
}

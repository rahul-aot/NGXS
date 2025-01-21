import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AuthActions } from './auth.actions';
import { AuthService } from './auth.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

export interface AuthStateModel {
  username: string | null;
  token: string | null;
  loading: boolean;
  error: any;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    username: null,
    token: null,
    loading: false,
    error: null
  }
})
@Injectable() // Add this decorator
export class AuthState {
  constructor(private authService: AuthService) {}


  @Selector()
static username(state: AuthStateModel): string | null {
  return state.username;
}

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }


  @Action(AuthActions.Login)
  login(ctx: StateContext<AuthStateModel>, action: AuthActions.Login) {
    ctx.patchState({ loading: true, error: null });
    return this.authService.login(action.payload).pipe(
      tap((response: any) => {
        if (response.statusCode === 200) {
          const token = response.data; // Extract the token from the response
          ctx.dispatch(new AuthActions.LoginSuccess({
            username: action.payload.username, // Pass the username
            token: token
          }));
        } else {
          throw new Error(response.message); // Handle unexpected responses
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        let errorMessage = 'An unknown error occurred';
        if (error.status === 0) {
          errorMessage = 'Network error: Please check your internet connection.';
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message; // Use the error message from the API response
        }
        ctx.dispatch(new AuthActions.LoginFailure({ error: errorMessage }));
        return of(error);
      })
    );
  }

  @Action(AuthActions.LoginSuccess)
loginSuccess(ctx: StateContext<AuthStateModel>, action: AuthActions.LoginSuccess) {
  ctx.patchState({
    username: action.payload.username, // Store the username
    token: action.payload.token,
    loading: false,
    error: null
  });
}

  @Action(AuthActions.LoginFailure)
  loginFailure(ctx: StateContext<AuthStateModel>, action: AuthActions.LoginFailure) {
    ctx.patchState({
      loading: false,
      error: action.payload.error
    });
  }
}

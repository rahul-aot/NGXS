import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AuthActions } from './auth.actions';
import { AuthService } from './auth.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

export interface AuthStateModel {
  userId: number | null;
  emailId: string | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: any;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    userId: null,
    emailId: null,
    token: null,
    refreshToken: null,
    loading: false,
    error: null
  }
})
@Injectable() // Add this decorator
export class AuthState {
  constructor(private authService: AuthService) {}

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static emailId(state: AuthStateModel): string | null {
    return state.emailId;
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
        const { userId, emailId, token, refreshToken } = response.data;
        ctx.dispatch(new AuthActions.LoginSuccess({ userId, emailId, token, refreshToken }));
      }),
      catchError(error => {
        ctx.dispatch(new AuthActions.LoginFailure({ error }));
        return of(error);
      })
    );
  }

  @Action(AuthActions.LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, action: AuthActions.LoginSuccess) {
    ctx.patchState({
      userId: action.payload.userId,
      emailId: action.payload.emailId,
      token: action.payload.token,
      refreshToken: action.payload.refreshToken,
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

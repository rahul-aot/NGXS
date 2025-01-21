import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AuthActions } from './auth.actions';
import { AuthService } from './auth.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface AuthStateModel {
  token: string | null;
  loading: boolean;
  error: any;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    loading: false,
    error: null
  }
})
export class AuthState {
  constructor(private authService: AuthService) {}

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Action(AuthActions.Login)
  login(ctx: StateContext<AuthStateModel>, action: AuthActions.Login) {
    ctx.patchState({ loading: true, error: null });
    return this.authService.login(action.payload).pipe(
      tap((token: string) => {
        ctx.dispatch(new AuthActions.LoginSuccess({ token }));
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
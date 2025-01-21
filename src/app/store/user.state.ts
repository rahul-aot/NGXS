import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { UsersActions } from './user.actions';
import { UserService } from './user.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthState } from './auth.state';

export interface UsersStateModel {
  users: any[];
  loading: boolean;
  error: any;
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    users: [],
    loading: false,
    error: null
  }
})
export class UsersState {
  constructor(private userService: UserService, private store: Store) {}

  @Selector()
  static users(state: UsersStateModel): any[] {
    return state.users;
  }

  @Action(UsersActions.GetUsers)
  getUsers(ctx: StateContext<UsersStateModel>) {
    const token = this.store.selectSnapshot(AuthState.token);
    if (!token) {
      ctx.patchState({ error: 'No token available', loading: false });
      return;
    }
    ctx.patchState({ loading: true, error: null });
    return this.userService.getAllUsers(token).pipe(
      tap(users => ctx.dispatch(new UsersActions.GetUsersSuccess({ users }))),
      catchError(error => {
        ctx.dispatch(new UsersActions.GetUsersFailure({ error }));
        return of(error);
      })
    );
  }

  @Action(UsersActions.GetUsersSuccess)
  getUsersSuccess(ctx: StateContext<UsersStateModel>, action: UsersActions.GetUsersSuccess) {
    ctx.patchState({
      users: action.payload.users,
      loading: false,
      error: null
    });
  }

  @Action(UsersActions.GetUsersFailure)
  getUsersFailure(ctx: StateContext<UsersStateModel>, action: UsersActions.GetUsersFailure) {
    ctx.patchState({
      loading: false,
      error: action.payload.error
    });
  }
}
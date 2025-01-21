export namespace AuthActions {
  export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: { username: string; password: string }) {}
  }

  export class LoginSuccess {
    static readonly type = '[Auth] Login Success';
    constructor(public payload: { username: string; token: string }) {} // Add username
  }

  export class LoginFailure {
    static readonly type = '[Auth] Login Failure';
    constructor(public payload: { error: any }) {}
  }
}

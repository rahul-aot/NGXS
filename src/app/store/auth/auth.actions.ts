export namespace AuthActions {
  export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: { emailId: string; password: string }) {}
  }

  export class LoginSuccess {
    static readonly type = '[Auth] Login Success';
    constructor(public payload: { userId: number; emailId: string; token: string; refreshToken: string }) {}
  }

  export class LoginFailure {
    static readonly type = '[Auth] Login Failure';
    constructor(public payload: { error: any }) {}
  }
}

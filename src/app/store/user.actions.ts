export namespace UsersActions {
    export class GetUsers {
      static readonly type = '[Users] Get Users';
    }
  
    export class GetUsersSuccess {
      static readonly type = '[Users] Get Users Success';
      constructor(public payload: { users: any[] }) {}
    }
  
    export class GetUsersFailure {
      static readonly type = '[Users] Get Users Failure';
      constructor(public payload: { error: any }) {}
    }
  }
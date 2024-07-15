import {createAction, props} from "@ngrx/store";
import {UsersEntity} from "./users.entity";
import {CreateUserDTO} from "../users-dto.model";

export const initUsers = createAction("[Users Page] Init");

export const loadUsersSuccess = createAction(
  "[Users/API] Load Users Success",
  props<{users: UsersEntity[]}>()
);

export const loadUsersFailure = createAction(
  "[Users/API] Load Users Failure",
  props<{error: any}>()
);

// Delete User
export const deleteUser = createAction(
  "[Users/API] Delete User",
  props<{id: number}>()
);

export const deleteUserSuccess = createAction(
  "[Users/API] Delete User Success",
  props<{id: number}>()
);

export const deleteUserFailure = createAction(
  "[Users/API] Delete User Failure",
  props<{error: any}>()
);

// Add User
export const addUser = createAction(
  "[Users Page] Add User",
  props<{user: CreateUserDTO}>()
);
export const addUserSuccess = createAction(
  "[Users/Api] Add User Success",
  props<{user: UsersEntity}>()
);
export const addUserFailed = createAction(
  "[Users/Api] Add User Failed",
  props<{error: any}>()
);

import {EntityState, EntityAdapter, createEntityAdapter} from "@ngrx/entity";
import {createReducer, on, Action} from "@ngrx/store";

import * as UsersActions from "./users.actions";
import {UsersEntity} from "./users.entity";

export const USERS_FEATURE_KEY = "users";

export type UsersStatus = "init" | "loading" | "loaded" | "error";

export interface UsersState extends EntityState<UsersEntity> {
  selectedId?: string | number;
  status: UsersStatus;
  error: string | null;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const usersAdapter: EntityAdapter<UsersEntity> =
  createEntityAdapter<UsersEntity>();

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  status: "init" as const,
  error: null,
});

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.initUsers, (state) => ({
    ...state,
    status: "loading" as const,
    error: null,
  })),
  on(UsersActions.loadUsersSuccess, (state, {users}) =>
    usersAdapter.setAll(users, {...state, status: "loaded" as const})
  ),
  on(UsersActions.loadUsersFailure, (state, {error}) => ({
    ...state,
    status: "error" as const,
    error,
  })),

  on(UsersActions.deleteUserSuccess, (state, {id}) => {
    return usersAdapter.removeOne(id, {...state});
  }),
  on(UsersActions.deleteUserFailure, (state, {error}) => ({
    ...state,
    status: "error" as const,
    error,
  })),

  on(UsersActions.addUserSuccess, (state, {user}) =>
    usersAdapter.addOne({...user}, {...state})
  ),

  on(UsersActions.editUserSuccess, (state, {userData}) =>
    usersAdapter.updateOne({id: userData.id, changes: userData}, state)
  ),
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}

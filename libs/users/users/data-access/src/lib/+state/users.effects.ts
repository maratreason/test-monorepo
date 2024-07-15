import {inject} from "@angular/core";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import {switchMap, catchError, of, map} from "rxjs";
import * as UsersActions from "./users.actions";
import * as UsersFeature from "./users.reducer";
import {ApiService} from "@users/core/http";
import {UsersEntity} from "./users.entity";
import {CreateUserDTO, UsersDTO} from "../users-dto.model";
import {usersDTOAdapter} from "../users-dto.adapter";

export const usersEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    actions$.subscribe(console.log);

    return actions$.pipe(
      ofType(UsersActions.initUsers),
      switchMap(() =>
        apiService.get<UsersDTO[]>("/users").pipe(
          map((users) =>
            UsersActions.loadUsersSuccess({
              users: users.map((user) => usersDTOAdapter.DTOtoEntity(user)),
            })
          ),
          catchError((error) => {
            console.error("Error", error);
            return of(UsersActions.loadUsersFailure({error}));
          })
        )
      )
    );
  },
  {functional: true}
);

export const deleteUser = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(UsersActions.deleteUser),
      switchMap(({id}) =>
        apiService.delete<UsersDTO[]>(`/users/${id}`).pipe(
          map(() => UsersActions.deleteUserSuccess({id})),
          catchError((error) => {
            console.error("Error", error);
            return of(UsersActions.deleteUserFailure({error}));
          })
        )
      )
    );
  },
  {functional: true}
);

export const addUser = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(UsersActions.addUser),
      switchMap(({user}) =>
        apiService.post<UsersDTO, CreateUserDTO>("/users", user).pipe(
          map((user) => usersDTOAdapter.entityToDTO(user)),
          map((userEntity) => UsersActions.addUserSuccess({user: userEntity})),
          catchError((error) => {
            console.error("Error", error);
            return of(UsersActions.addUserFailed({error}));
          })
        )
      )
    );
  },
  {functional: true}
);

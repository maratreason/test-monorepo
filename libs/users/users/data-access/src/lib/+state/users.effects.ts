import {inject} from "@angular/core";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import {switchMap, catchError, of, map, withLatestFrom, filter} from "rxjs";
import * as UsersActions from "./users.actions";
import * as UsersFeature from "./users.reducer";
import {ApiService} from "@users/core/http";
import {UsersEntity} from "./users.entity";
import {CreateUserDTO, UsersDTO} from "../users-dto.model";
import {usersDTOAdapter} from "../users-dto.adapter";
import {select, Store} from "@ngrx/store";
import {selectUsersEntities} from "./users.selectors";

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

export const editUser = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const usersEntities$ = inject(Store).pipe(select(selectUsersEntities));

    return actions$.pipe(
      ofType(UsersActions.editUser),
      withLatestFrom(usersEntities$),
      filter(([{id}, usersEntities]) => Boolean(usersEntities[id])),
      map(([editUserPayload, usersEntities]) => {
        const idUserToEdit = editUserPayload.id;
        const userEntityToEdit = <UsersEntity>usersEntities[idUserToEdit];
        const dtoUser = usersDTOAdapter.entityToDTO(userEntityToEdit);
        const dtoToUpdateUser = {
          ...dtoUser,
          name: editUserPayload.userData.name,
          email: editUserPayload.userData.email,
        };

        return dtoToUpdateUser;
      }),

      switchMap((user: UsersDTO) =>
        apiService.post<UsersDTO, UsersDTO>(`/users/${user.id}`, user).pipe(
          map((userData) => UsersActions.editUserSuccess({userData})),
          catchError((error) => {
            console.log("Error", error);
            return of(UsersActions.editUserFailed({error}));
          })
        )
      )
    );
  },
  {functional: true}
);

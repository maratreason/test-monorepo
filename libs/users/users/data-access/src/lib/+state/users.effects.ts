import {Injectable, inject} from "@angular/core";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import {switchMap, catchError, of, map} from "rxjs";
import * as UsersActions from "./users.actions";
import * as UsersFeature from "./users.reducer";
import {ApiService} from "@users/core/http";
import {UsersEntity} from "./users.models";

export const usersEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    actions$.subscribe(console.log)

    return actions$.pipe(
      ofType(UsersActions.initUsers),
      switchMap(() =>
        apiService.get<UsersEntity[]>("/users").pipe(
          map((users) => UsersActions.loadUsersSuccess({users})),
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

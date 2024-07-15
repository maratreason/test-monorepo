import {inject} from "@angular/core";
import {createEffect, Actions, ofType} from "@ngrx/effects";
import {switchMap, catchError, of, map} from "rxjs";
import {ApiService} from "@users/core/http";
import * as PostsActions from "./posts.actions";
import {PostsDTO} from "../posts-dto.model";


export const postsEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    actions$.subscribe(console.log);

    return actions$.pipe(
      ofType(PostsActions.initPosts),
      switchMap(() =>
        apiService.get<PostsDTO[]>("/users/1/posts/").pipe(
          map((posts) => PostsActions.loadPostsSuccess({posts})),
          catchError((error) => {
            console.error("Error", error);
            return of(PostsActions.loadPostsFailure({error}));
          })
        )
      )
    );
  },
  {functional: true}
);

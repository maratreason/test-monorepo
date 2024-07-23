import {EntityState, EntityAdapter, createEntityAdapter} from "@ngrx/entity";
import {createReducer, on, Action} from "@ngrx/store";

import * as PostsActions from "./posts.actions";
import {PostsEntity} from "./posts.entity";
import {IPost} from "./post.model";

export const POSTS_FEATURE_KEY = "posts";

export type PostsStatus = "init" | "loading" | "loaded" | "error";

export interface PostsState extends EntityState<PostsEntity> {
  selectedId?: string | number;
  status: PostsStatus;
  error: string | null;
  posts: ReadonlyArray<IPost>;
}

export interface PostsPartialState {
  readonly [POSTS_FEATURE_KEY]: PostsState;
}

export const postsAdapter: EntityAdapter<PostsEntity> =
  createEntityAdapter<PostsEntity>();

export const initialPostsState: PostsState = postsAdapter.getInitialState({
  posts: [],
  status: "init" as const,
  error: null,
});

const reducer = createReducer(
  initialPostsState,
  on(PostsActions.initPosts, (state) => ({
    ...state,
    status: "loading" as const,
    error: null,
  })),
  on(PostsActions.loadPostsSuccess, (state, {posts}) =>
    postsAdapter.setAll(posts, {...state, status: "loaded" as const})
  ),
  on(PostsActions.loadPostsFailure, (state, {error}) => ({
    ...state,
    status: "error" as const,
    error,
  })),
);

export function postsReducer(state: PostsState | undefined, action: Action) {
  return reducer(state, action);
}

import {createAction, createActionGroup, props} from "@ngrx/store";
import {PostsEntity} from "./posts.entity";
import {IPost} from "./post.model";

export const initPosts = createAction("[Posts Page] Init");

export const loadPostsSuccess = createAction(
  "[Posts/API] Load Posts Success",
  props<{posts: PostsEntity[]}>()
);

export const loadPostsFailure = createAction(
  "[Posts/API] Load Posts Failure",
  props<{error: any}>()
);

// NGRX
export const PostsActions = createActionGroup({
  source: 'Posts',
  events: {
    'Add Post': props<{ id: string }>(),
    'Remove Post': props<{ id: string }>(),
  },
});

export const PostsApiActions = createActionGroup({
  source: 'Posts API',
  events: {
    'Load Posts List': props<{ posts: ReadonlyArray<IPost> }>(),
  },
});

import {Injectable, inject} from "@angular/core";
import {select, Store, Action} from "@ngrx/store";

import * as PostsActions from "./posts.actions";
import * as PostsFeature from "./posts.reducer";
import * as PostsSelectors from "./posts.selectors";

@Injectable({providedIn: "root"})
export class PostsFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(PostsSelectors.selectPostsLoaded));
  allPosts$ = this.store.pipe(select(PostsSelectors.selectAllPosts));
  selectedPosts$ = this.store.pipe(select(PostsSelectors.selectEntity));

  init() {
    this.store.dispatch(PostsActions.initPosts());
  }
}

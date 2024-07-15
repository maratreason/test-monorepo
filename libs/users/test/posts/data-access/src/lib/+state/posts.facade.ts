import {Injectable, inject} from "@angular/core";
import {select, Store, Action} from "@ngrx/store";

import * as PostsActions from "./posts.actions";
import * as PostsFeature from "./posts.reducer";
import * as PostsSelectors from "./posts.selectors";

@Injectable()
export class PostsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(PostsSelectors.selectPostsLoaded));
  allPosts$ = this.store.pipe(select(PostsSelectors.selectAllPosts));
  selectedPosts$ = this.store.pipe(select(PostsSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(PostsActions.initPosts());
  }
}

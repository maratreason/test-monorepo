import {NgModule} from "@angular/core";
import {TestBed} from "@angular/core/testing";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule, Store} from "@ngrx/store";
import {readFirst} from "@nx/angular/testing";

import * as PostsActions from "./posts.actions";
import {PostsEffects} from "./posts.effects";
import {PostsFacade} from "./posts.facade";
import {PostsEntity} from "./posts.models";
import {
  POSTS_FEATURE_KEY,
  PostsState,
  initialPostsState,
  postsReducer,
} from "./posts.reducer";
import * as PostsSelectors from "./posts.selectors";

interface TestSchema {
  posts: PostsState;
}

describe("PostsFacade", () => {
  let facade: PostsFacade;
  let store: Store<TestSchema>;
  const createPostsEntity = (id: string, name = ""): PostsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe("used in NgModule", () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(POSTS_FEATURE_KEY, postsReducer),
          EffectsModule.forFeature([PostsEffects]),
        ],
        providers: [PostsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({imports: [RootModule]});

      store = TestBed.inject(Store);
      facade = TestBed.inject(PostsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it("loadAll() should return empty list with loaded == true", async () => {
      let list = await readFirst(facade.allPosts$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allPosts$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadPostsSuccess` to manually update list
     */
    it("allPosts$ should return the loaded list; and loaded flag == true", async () => {
      let list = await readFirst(facade.allPosts$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        PostsActions.loadPostsSuccess({
          posts: [createPostsEntity("AAA"), createPostsEntity("BBB")],
        })
      );

      list = await readFirst(facade.allPosts$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});

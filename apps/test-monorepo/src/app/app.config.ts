import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from "@angular/core";
import {provideRouter} from "@angular/router";
import {provideHttpClient} from "@angular/common/http";
import {provideState, provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";

import {API_URL} from "@users/core/http";
import {appRoutes} from "./app.routes";
import {environment} from "../environments/environment.development";
import {
  UsersFacade,
  USERS_FEATURE_KEY,
  usersReducer,
  usersEffects,
} from "@users/data-access";
import {POSTS_FEATURE_KEY, postsEffects, PostsFacade, postsReducer} from "@posts/data-access";
import {provideRouterStore, routerReducer} from "@ngrx/router-store";

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(usersEffects, postsEffects),
    UsersFacade,
    PostsFacade,
    provideStore({
      router: routerReducer,
      [USERS_FEATURE_KEY]: usersReducer,
      [POSTS_FEATURE_KEY]: postsReducer,
    }),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(appRoutes),
    provideHttpClient(),
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
    provideRouterStore(),
    provideAnimationsAsync(),
  ],
};

// Остановился на уроке 20.
// Создать тестовый проект, прямо в либе users. И там использовать все фишки NGRX.
// Entity, ngrx-store, ngrx-data, ngrx-component, ngrx-signals, ngrx-operators. Создать отдельный data-access и использовать его.

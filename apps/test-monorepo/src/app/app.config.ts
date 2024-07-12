import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from "@angular/core";
import {provideRouter} from "@angular/router";
import {provideHttpClient} from "@angular/common/http";
import {provideStore, provideState} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {provideStoreDevtools} from "@ngrx/store-devtools";

import {API_URL} from "@users/core/http";
import {appRoutes} from "./app.routes";
import {environment} from "../environments/environment.development";
import {UsersFacade, USERS_FEATURE_KEY, usersReducer, usersEffects} from "@users/data-access";

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(usersEffects),
    provideState(USERS_FEATURE_KEY, usersReducer),
    UsersFacade,
    provideStore(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(appRoutes),
    provideHttpClient(),
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
  ],
};

// Остановился на уроке 14.
// Создать тестовый проект, прямо в либе users. И там использовать все фишки NGRX.
// Entity, ngrx-store, ngrx-data, ngrx-component, ngrx-signals, ngrx-operators. Создать отдельный data-access и использовать его.

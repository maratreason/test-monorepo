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
import {UsersEffects, UsersFacade} from "@users/data-access";
import * as fromUsers from "../../../../libs/users/users/data-access/src/lib/+state/users.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(UsersEffects),
    provideState(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
    UsersFacade,
    provideStoreDevtools({
      logOnly: !isDevMode(),
      maxAge: 25,
    }),
    provideStore(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(appRoutes),
    provideHttpClient(),
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
  ],
};

// Остановился на уроке 12. 20:00.
// Нужно социальное одобрение. Например:
// - Марат, как ты во всём этом разбираешься? Ты пишешь код. Это так круто!
// Для изучения NGRX нужно создать тестовый проект, прямо в либе users. И там использовать все фишки NGRX.
// Entity, ngrx-store, ngrx-data, ngrx-component, ngrx-signals, ngrx-operators. Создать отдельный data-access и использовать его.

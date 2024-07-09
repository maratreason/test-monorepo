import {ApplicationConfig, provideZoneChangeDetection} from "@angular/core";
import {provideRouter} from "@angular/router";
import {provideHttpClient} from "@angular/common/http";
import {API_URL} from "@users/core/http";

import {appRoutes} from "./app.routes";
import {environment} from "../environments/environment.development";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(appRoutes),
    provideHttpClient(),
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
  ],
};

// Остановился на уроке 9.

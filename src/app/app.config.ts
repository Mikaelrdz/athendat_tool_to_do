import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxIndexedDBService, NgxIndexedDBModule } from 'ngx-indexed-db';
import { provideHttpClient } from '@angular/common/http';
import { dbConfig } from './db.config';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig)),
  ],
};

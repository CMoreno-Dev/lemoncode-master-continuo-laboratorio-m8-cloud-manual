import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { rutas } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(rutas),
    provideAnimations(),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
};

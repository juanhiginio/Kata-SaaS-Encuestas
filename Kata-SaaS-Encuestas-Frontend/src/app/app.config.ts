import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()), {
      // Configura el interceptor de autenticación para agregar el token a las solicitudes HTTP
      provide: HTTP_INTERCEPTORS,
      // Usa la clase AuthInterceptor para interceptar las solicitudes HTTP
      useClass: AuthInterceptor,
      // Permite múltiples interceptores si es necesario
      multi: true
    }
  ]
};

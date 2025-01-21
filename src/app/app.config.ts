import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { routes } from './app.routes';
import { NgxsModule, provideStore } from '@ngxs/store';
import { AuthState } from './store/auth/auth.state';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
     provideRouter(routes),
     provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideStore([AuthState]), // Configure NGXS with your state
    ]
};

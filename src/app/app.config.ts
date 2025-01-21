import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { routes } from './app.routes';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './store/auth/auth.state';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
    //  NgxsModule.forRoot([AuthState]),
    //  NgxsLoggerPluginModule.forRoot(),
    ]
};

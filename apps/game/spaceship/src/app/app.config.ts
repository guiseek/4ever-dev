import {ApplicationConfig} from '@angular/core'
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router'
import {appRoutes} from './app.routes'
import { AppProviders } from './app.providers'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    AppProviders.forRoot()
  ],
}

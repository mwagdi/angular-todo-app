import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideClientHydration, withHttpTransferCacheOptions} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from '@angular/common/http';
import { graphqlProvider } from './graphql.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideClientHydration(
    //   withHttpTransferCacheOptions({
    //   })
    // ),
    provideHttpClient(withFetch()),
    graphqlProvider
  ]
};

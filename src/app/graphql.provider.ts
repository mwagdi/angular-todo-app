import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpHeaders } from '@angular/common/http';

const uri = 'https://mwagdi-todo-api-b54f4f72c849.herokuapp.com/';
export function apolloOptionsFactory(): ApolloClientOptions<unknown> {
  const httpLink = inject(HttpLink);

  const token =
    typeof localStorage === 'undefined' ?
      undefined :
      localStorage.getItem('token');

  const headers = new HttpHeaders({
    ...(token ? { Authorization: `Bearer ${token}` }:{}),
  });

  return {
    link: httpLink.create({ uri, headers }),
    cache: new InMemoryCache(),
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];

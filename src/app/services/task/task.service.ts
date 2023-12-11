import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';

const GET_TASKS = gql`
    query ($name: String!) {
      tasks {
        id
        title
        status
      }
      __type (name: $name) {
        enumValues {
          name
        }
      }
    }
`;

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  token = localStorage.getItem('token');

  constructor(private apollo: Apollo) { }

  getTasks() {
    return this.apollo.watchQuery({
      query: GET_TASKS,
      variables: { name: 'Status' },
      context: {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
      }
    });
  }
}

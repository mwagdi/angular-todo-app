import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

interface TasksResponse {
  __type: {
    enumValues: { name: string }[]
  }
  tasks: {id: number, title: string, status: string}[]
}

const GET_TASKS = gql<TasksResponse, NonNullable<unknown>>`
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
  token = typeof localStorage === 'undefined' ? undefined : localStorage.getItem('token');

  constructor(private apollo: Apollo) { }

  getTasks() {
    if(this.token) {
      return this.apollo.query({
        query: GET_TASKS,
        variables: { name: 'Status' },
        context: {
          headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
        }
      });
    }

    return throwError(new Error('User not logged in'));
  }
}

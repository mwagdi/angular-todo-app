import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { TaskEditInput } from '../../taskEditInput';

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

const EDIT_TASK = gql`
  mutation($id: Int!, $task: TaskEditInput!) {
    editTask(id: $id, task: $task) {
      id
      title
      status
      description
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

  editTask(id: number, data: TaskEditInput) {
    if(this.token) {
      return this.apollo.mutate({
        mutation: EDIT_TASK,
        variables: { id, task: data },
        context: {
          headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
        }
      });
    }

    return throwError(new Error('User not logged in'));
  }
}

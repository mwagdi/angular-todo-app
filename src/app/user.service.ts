import { Injectable } from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {SignupInput} from "./signupinput";

const GET_USERS = gql`
    query {
      users {
        id
        email
        username
      }
    }
`;

const SIGNUP = gql`
    mutation Signup($input: SignupInput!) {
      signup(input: $input) {
        token
        user {
          id
          email
          username
          first_name
          last_name
          tasks {
            id
            title
            status
          }
        }
      }
    }
`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { }

  getUsers() {
    return this.apollo.watchQuery({
      query: GET_USERS
    })
  }

  signup(input: SignupInput) {
    return this.apollo.mutate({
      mutation: SIGNUP,
      variables: {
        input
      }
    });
  }
}

import { Injectable } from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {SignupInput} from "../../signupinput";
import {LoginInput} from "../../logininput";
import {AuthResponse} from "../../authresponse";

const SIGNUP = gql<AuthResponse, { input: SignupInput }>`
    mutation Signup($input: SignupInput!) {
      signup(input: $input) {
        token
        user {
          id
          email
          username
          first_name
          last_name
        }
      }
    }
`;

const LOGIN = gql<AuthResponse, LoginInput>`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        username
        first_name
        last_name
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apollo: Apollo) { }

  // getUsers() {
  //   return this.apollo.watchQuery({
  //     query: GET_USERS
  //   })
  // }

  signup(input: SignupInput) {
    return this.apollo.mutate({
      mutation: SIGNUP,
      variables: {
        input
      }
    });
  }

  login(input: LoginInput) {
    console.log(input)
    return this.apollo.mutate({
      mutation: LOGIN,
      variables: input
    });
  }
}

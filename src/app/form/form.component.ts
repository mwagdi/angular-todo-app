/**
 * FormComponent is responsible for handling both login and signup forms.
 * It uses Angular Reactive Forms for the form controls and validations.
 * AuthService is injected via constructor to handle Authentication related API calls.
 * Angular Router service is used to perform route navigations.
 */

import { Component, Input } from '@angular/core';
import { FormType } from '../formType';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { LoginInput } from '../logininput';
import { SignupInput } from '../signupinput';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  /**
   * FormType (either 'login' or 'signup') is passed as Input to the component
   * to determine whether to render login form or signup form
   */
  @Input() formType!: FormType;


  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Reactive Form Group definition for Signup Form.
   * It contains FormControl for each individual form inputs present in the signup form
   * along with their validation rules.
   */
  signupForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl(
      '',
      [Validators.required, Validators.minLength(4)]
    ),
    password: new FormControl(
      '',
      [Validators.required, Validators.minLength(8)]
    )
  });

  /**
   * Reactive Form Group definition for Login Form.
   * It contains FormControl for each individual form inputs present in the login form
   * along with their validation rules.
   */
  loginForm = new FormGroup({
    email: new FormControl(
      '',
      [Validators.required, Validators.email]
    ),
    password: new FormControl(
      '',
      [Validators.required, Validators.minLength(8)]
    )
  });

  /**
   * Method to handle Signup Form submission.
   * If the form is valid, it uses AuthService to make the signup API call.
   * If the signup is successful, it sets the user token and user information in the localStorage.
   * After successful signup, it navigates the user to the /dashboard route.
   */
  onSignupSubmit() {
    if(this.signupForm.valid) {
      const signupFormData = this.signupForm.value;
      this.authService.signup(signupFormData as SignupInput)
        .subscribe({
          next: ({ data }) => {
            if(data?.signup) {
              localStorage.setItem('token', data.signup.token);
              localStorage.setItem('user', JSON.stringify(data.signup.user));
            }
            this.router.navigateByUrl('/dashboard');
          },
          error: error => console.log({ error }),
          complete: () => console.log('All done!')
        });
    }
  }

  /**
   * Method to handle Login Form submission.
   * If the form is valid, it uses AuthService to make the login API call.
   * If the login is successful, it sets the user token and user information in the localStorage.
   * After successful login, it navigates the user to the /dashboard route.
   */
  onLoginSubmit() {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value as LoginInput)
        .subscribe({
          next: ({ data }) => {
            if(data?.login) {
              localStorage.setItem('token', data.login.token);
              localStorage.setItem('user', JSON.stringify(data.login.user));
            }
            this.router.navigateByUrl('/dashboard');
          },
          error: error => {
            throw new Error(error.message);
          },
          complete: () => console.log('All done!')
        });
    }
  }
}

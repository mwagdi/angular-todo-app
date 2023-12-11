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

/**
 * @Component for the forms on a page
 * @selector defines the tag for html implementation
 * @standalone sets the encapsulation view
 * @import imports the ReactiveFormsModule using for reactive forms control
 * @templateUrl is the location of the component html file
 * @styleUrl is the location of the component SCSS file
 * Used to manage LoginComponent and SignupComponent
 */
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  /**
   * Receives form type from a parent component, could be 'login' or 'signup'
   */
  @Input() formType!: FormType;

  /**
   * Create an instance of AuthService for user authentication manipulation
   */
  constructor(private authService: AuthService ) {}

  /**
   * Create a new signup form using FormGroup
   * Each control for a field in a form (Input tag in HTML)
   * Each field attached with chosen Validators
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
   * Create a new login form using FormGroup
   * Each control for a field in a form (Input tag in HTML)
   * Each field attached with chosen Validators
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
   * A function handle user signup
   * It calls authService to do signup task
   * If signup success, it will log returned value. If signup failed,
   * it will log the error
   */
  onSignupSubmit() {
    if(this.signupForm.valid) {
      const signupFormData = this.signupForm.value;
      this.authService.signup(signupFormData as SignupInput)
        .subscribe({
          next: ({ data }) => {
            if(data?.signup) localStorage.setItem('token', data.signup.token);
          },
          error: error => console.log({ error }),
          complete: () => console.log('All done!')
        });
    }
  }

  /**
   * A function handle user login
   * It calls authService to do login task
   * If login success,
   * it will log returned value. If login failed, it will log the error
   */
  onLoginSubmit() {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value as LoginInput)
        .subscribe({
          next: ({ data }) => {
            if(data?.login) localStorage.setItem('token', data.login.token);
          },
          error: error => {
            throw new Error(error.message);
          },
          complete: () => console.log('All done!')
        });
    }
  }
}

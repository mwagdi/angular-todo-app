import {Component, Input} from '@angular/core';
import {Formtype} from "../formtype";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../services/auth/auth.service";
import {LoginInput} from "../logininput";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() formType!: Formtype;

  constructor(private authService: AuthService ) {}

  signupForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  onSignupSubmit() {
    // if(this.signupForm.valid) this.authService.signup(this.signupForm.getRawValue());
  }

  onLoginSubmit() {
    if(this.loginForm.valid) this.authService.login(this.loginForm.value as LoginInput).subscribe(data => {
      console.log({data})
    }, error => {
      console.log({error})
    });
  }
}

import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { FormType } from '../formType';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  formType: FormType = FormType.LOGIN;

  constructor(private userService: AuthService) {}

  changeFormType(type: FormType) {
    this.formType = type;
  }

  protected readonly FormType = FormType;
}

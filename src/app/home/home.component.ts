import {Component} from '@angular/core';
import {FormComponent} from "../form/form.component";
import {Formtype} from "../formtype";
import {AuthService} from "../services/auth/auth.service";

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
  constructor(private userService: AuthService) {}

  formType: Formtype = Formtype.LOGIN;
  // ngOnInit() {
  //
  // }
}

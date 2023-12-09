import {Component} from '@angular/core';
import {FormComponent} from "../form/form.component";
import {Formtype} from "../formtype";

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
  formType: Formtype = Formtype.LOGIN;
}

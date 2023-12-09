import {Component, Input} from '@angular/core';
import {Formtype} from "../formtype";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() formType!: Formtype;
}

import {Component} from '@angular/core';
import {FormComponent} from "../form/form.component";
import {Formtype} from "../formtype";
import {UserService} from "../user.service";

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
  constructor(private userService: UserService) {}

  formType: Formtype = Formtype.LOGIN;
  ngOnInit() {
    this.userService.getUsers().valueChanges.subscribe(({data, loading}) => {
      console.log({data, loading});
    })
  }
}

import { Component } from '@angular/core';
import { TaskService } from '../services/task/task.service';
import { ApolloQueryResult } from '@apollo/client';

interface TasksResponse {
  __type: {
    enumValues: string[]
  }
  tasks: {id: number, title: string, status: string}
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  statusTypes = [];
  tasks: { id: number; title: string; status: string }[] = [];
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe({
      next: ({ data }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.statusTypes = data.__type.enumValues.map(value => value.name);
        this.tasks = data.tasks ? data.tasks : [];
      },
      error: err => {
        console.log({ err });
      },
      complete: () => {
        console.log('All done!');
      }
    });
  }
}

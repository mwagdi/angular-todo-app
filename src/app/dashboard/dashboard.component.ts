import { Component, ViewEncapsulation } from '@angular/core';
import { TaskService } from '../services/task/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  statusColumns: {
    name: string,
    tickets: { id: number; title: string; status: string }[]
  }[] = [];
  dragged: EventTarget | null = null;
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe({
      next: ({ data }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        this.statusColumns = data.__type.enumValues.map(value => {
          return {
            name: value.name.replace('_', ' '),
            tickets: data.tasks? data.tasks.filter(task => task.status === value.name) : []
          };
        });
      },
      error: err => {
        console.log({ err });
      },
      complete: () => {
        console.log('All done!');
      }
    });
  }

  handleDragStart(event: DragEvent){
    this.dragged = event.target;
  }

  handleDragOver(event: DragEvent) {
    event.preventDefault();

  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    const { parentNode, className } = <HTMLElement>event.target;
    const dropZone = className === 'drag' ? parentNode : event.target as HTMLElement;
    (<HTMLElement>this.dragged)?.parentNode?.removeChild(<Node>this.dragged);
    dropZone?.appendChild(<Node>this.dragged);
  }
}

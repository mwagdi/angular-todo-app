import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TaskService } from '../services/task/task.service';
import { StatusType } from '../taskEditInput';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit{
  statusColumns: {
    name: string,
    tickets: { id: number; title: string; status: string }[]
  }[] = [];
  dragged: EventTarget | null = null;
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe({
      next: ({ data }) => {
        this.statusColumns = data.__type.enumValues.map(value => {
          return {
            name: value.name,
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
    const id = parseInt((<HTMLElement>this.dragged)?.getAttribute('task_id') as string);
    // const { parentNode, className } = <HTMLElement>event.target;
    const dropZone = event.target as HTMLElement;
    const status = dropZone.getAttribute('status_name') as StatusType;

    this.taskService.editTask(id, { status }).subscribe({
      next: value => {
        console.log({ value });
      },
      error: err => {
        console.error(err);
      },
      complete: () => {
        console.log('All done!');
      }
    });

    (<HTMLElement>this.dragged)?.parentNode?.removeChild(<Node>this.dragged);
    dropZone?.appendChild(<Node>this.dragged);
  }
}

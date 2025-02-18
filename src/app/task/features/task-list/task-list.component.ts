import { Component, inject } from '@angular/core';
import TableComponent from '../../ui/table/table.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../data-access/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    TableComponent, 
    MatIconModule, 
    MatDividerModule, 
    MatButtonModule, 
    RouterLink,
    FormsModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TaskService],
})

export default class TaskListComponent {

  tasksService = inject(TaskService);

}

import { Component, inject } from '@angular/core';
import TableComponent from '../../ui/table/table.component';
// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

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
    FormsModule         
  ],
  templateUrl: './task-list.component.html', 
  styleUrls: ['./task-list.component.scss'],  
  providers: [TaskService],  
                             
})
export default class TaskListComponent {
  // Inyectamos TaskService para acceder a las tareas y sus operaciones.
  tasksService = inject(TaskService);
}

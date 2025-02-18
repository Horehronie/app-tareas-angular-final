import { Component, effect, input, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../../data-access/task.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, RouterLink, MatSortModule, MatFormFieldModule, MatInputModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export default class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'titular', 'monto', 'estado', 'archivo', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Task>();

  // Se reciben las tareas vía input
  tasks = input.required<Task[]>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Configuramos el filterPredicate para filtrar por titular, monto y estado (pagada/impaga)
    this.dataSource.filterPredicate = (data: Task, filter: string) => {
      const estadoStr = data.estado ? 'pagada' : 'impaga';
      const dataStr = (data.titular + ' ' + data.monto + ' ' + estadoStr).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };

    // Actualiza el dataSource cada vez que cambian las tareas
    effect(() => {
      this.dataSource.data = this.tasks();
      console.log('Tareas:', this.tasks());
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

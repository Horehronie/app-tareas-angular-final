import { Component, effect, input, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Task } from '../../data-access/task.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export default class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'titular', 'monto', 'estado', 'archivo', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Task>();

  tasks = input.required<Task[]>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource.filterPredicate = (data: Task, filter: string) => {
      const estadoStr = data.estado ? 'pagada' : 'impaga';
      const dataStr = (data.titular + ' ' + data.monto + ' ' + estadoStr).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };

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
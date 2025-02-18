import { Component, effect, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Task } from '../../data-access/task.service';
import { RouterLink } from '@angular/router';

interface Factura {
  id: string;
  titular: string;
  monto: string;
  estado: boolean;
  archivo: string;
}

const FACTURAS: Factura[] = [];

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, RouterLink],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export default class TableComponent {
  displayedColumns: string[] = ['id', 'titular', 'monto', 'estado', 'archivo', 'edit', 'delete'];
  dataSource = FACTURAS;

  tasks = input.required<Task[]>();

  constructor(){
    effect(() =>{
      console.log(this.tasks());
    })
  }

}

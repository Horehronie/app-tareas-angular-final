import { Component, inject, Injectable } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TaskService, Task } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { getStorage, ref, deleteObject } from 'firebase/storage';

@Component({
  selector: 'app-task-delete',
  standalone: true,
  providers: [TaskService],
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    RouterLink
  ],
  templateUrl: './task-delete.component.html',
  styleUrls: ['./task-delete.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export default class TaskDeleteComponent {
  idTask: string = '';

  private _taskService = inject(TaskService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  // Extrae la ruta del archivo desde la URL 
  private extractFilePath(fileUrl: string): string | null {
    try {
      const basePath = '/o/';
      const start = fileUrl.indexOf(basePath);
      if (start === -1) return null;
      const end = fileUrl.indexOf('?', start);
      const encodedPath = fileUrl.substring(start + basePath.length, end !== -1 ? end : undefined);
      return decodeURIComponent(encodedPath);
    } catch (error) {
      console.error('Error extrayendo la ruta del archivo:', error);
      return null;
    }
  }

  private async deleteFile(fileUrl: string): Promise<void> {
    const filePath = this.extractFilePath(fileUrl);
    if (!filePath) {
      console.error('No se pudo extraer la ruta del archivo.');
      return;
    }
    const storage = getStorage();
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
  }

  ngOnInit() {

    const id = this._route.snapshot.paramMap.get('idTask');
    if (id) {
      this.idTask = id;
    } else {
      toast.error('No se proporciono el id de la factura.');
    }
  }
  

  async submit() {
    try {
      // Primero obtenemos la tarea para extraer la URL del archivo
      const taskSnapshot = await this._taskService.getTask(this.idTask);
      if (!taskSnapshot.exists()) {
        toast.error('La factura no existe.');
        return;
      }
      const task = taskSnapshot.data() as Task;
      
      // Si existe un archivo, se procede a eliminarlo
      if (task.archivo) {
        await this.deleteFile(task.archivo);
      }

      // Eliminamos la tarea en Firestore
      await this._taskService.delete(this.idTask);
      toast.success('Factura eliminada con exito');
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      console.error('Error al eliminar la factura:', error);
      toast.error('Hubo un error al eliminar la factura');
    }
  }
}

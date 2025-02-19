import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Task, TaskCreate, TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UploadService } from '../../data-access/upload-file/upload.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  providers: [TaskService],
})
export default class TaskFormComponent {
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService);
  private _router = inject(Router);
  private _uploadService = inject(UploadService);
  private _route = inject(ActivatedRoute);

  loading = signal(false);

  idTask: string = '';

  archivoFile: File | null = null;

  form: FormGroup = this._formBuilder.group({
    titular: this._formBuilder.control('', Validators.required),
    monto: this._formBuilder.control('', Validators.required),
    estado: this._formBuilder.control(false, Validators.required),
    archivo: this._formBuilder.control('', Validators.required) // Se almacenará la URL del archivo
  });

  onFileSelected(event: Event): void {
    const inputElem = event.target as HTMLInputElement;
    
    if (inputElem.files && inputElem.files.length > 0) {
      this.archivoFile = inputElem.files[0];
      console.log('Archivo seleccionado:', this.archivoFile);
  
      // Subir el archivo a Firebase Storage usando UploadService
      this._uploadService.uploadFile(this.archivoFile).subscribe({
        next: (url) => {
          // Actualiza el formulario con la URL obtenido
          this.form.patchValue({ archivo: url });
          console.log('Archivo subido. URL:', url);
        },
        error: (err) => {
          console.error('Error al subir el archivo:', err);
          toast.error('Error al subir el archivo');
        }
      });
    }
  }
  
  ngOnInit() {
    // Extraemos el parámetro 'idTask' de la ruta.
    const id = this._route.snapshot.paramMap.get('idTask');
    if (id) {
      this.idTask = id;
      this.getTask(id);
    }
  }

  async getTask(id: string) {
    const taskSnapshot = await this._taskService.getTask(id);
    if (!taskSnapshot.exists()) return;
    const task = taskSnapshot.data() as Task;
    this.form.patchValue({
      ...task,
      monto: Number(task.monto)
    });
  }

  async submit() {
    // Verifica que el formulario sea válido y que el campo 'archivo' tenga valor (ya subido)
    if (this.form.invalid || !this.form.value.archivo) {
      console.log('Formulario inválido');
      toast.error('Complete todos los campos y espere a que se suba el archivo');
      return;
    }
  
    try {
      this.loading.set(true);
      const { titular, monto, estado, archivo } = this.form.value;
  
      // Crea la tarea utilizando la URL del archivo ya subido
      const task: TaskCreate = {
        titular: titular || '',
        monto: monto || 0,
        estado: estado || false,
        archivo: archivo // Ya contiene la URL
      };
  
      if (this.idTask) {
        this._taskService.update(task, this.idTask);
      } else {
        this._taskService.create(task);
      }
  
      toast.success(`Factura ${this.idTask ? 'actualizada' : 'cargada'} con éxito`);
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      console.error(error);
      toast.error('Ocurrió un error al cargar la factura');
    } finally {
      this.loading.set(false);
    }
  }
}

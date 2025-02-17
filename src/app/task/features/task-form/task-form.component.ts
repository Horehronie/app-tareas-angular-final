import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TaskCreate, TaskService } from '../../data-access/task.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export default class TaskFormComponent {
  private _formBuilder = inject(FormBuilder);
  private _taskService = inject(TaskService);
  private _router = inject(Router);

  loading = signal(false);

  archivoFile: File | null = null;

  form: FormGroup = this._formBuilder.group({
    titular: this._formBuilder.control('', Validators.required),
    monto: this._formBuilder.control('', Validators.required),
    estado: this._formBuilder.control(false, Validators.required),
    archivo: this._formBuilder.control('', Validators.required), //almacena la url del archivo

  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoFile = input.files[0];

      this.form.patchValue({ archivo: this.archivoFile.name }); //guarda el nombre, cambiar a url
      console.log('Archivo seleccionado:', this.archivoFile);
    }
  }

  async submit() {
    if (this.form.invalid || !this.archivoFile) {
      console.log('Formulario inválido o no se ha seleccionado un archivo');
      return;
    }

    try{
      this.loading.set(true);
      const {titular, monto, estado, archivo} = this.form.value;
      const task: TaskCreate = {
        titular: titular || '',
        monto: monto || 0,
        estado: estado,
        archivo: archivo || ''
      };

      await this._taskService.create(task);

      toast.success('Factura cargada con exito');
      this._router.navigateByUrl('/tasks');

    }catch(error){
      toast('Ocurrio un error')
    } finally {
      this.loading.set(false);
    }


  }
}


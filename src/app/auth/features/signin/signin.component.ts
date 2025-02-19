import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder } from '@angular/forms';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { hasEmailError, isRequired } from '../../utils/validators';
import { AuthService } from '../../data-access/auth.service';
// Librearia de notifiaciones toast
import { toast } from 'ngx-sonner';
// Router y RouterLink para navegación.
import { Router, RouterLink } from '@angular/router';
// Componente de botón para inicio de sesión con Google.
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';


// Definimos la interfaz FormSignIn que representa la estructura del formulario
// para el inicio de sesión
export interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-signup', 
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    GoogleButtonComponent
  ],
  templateUrl: './signin.component.html', 
  styleUrls: ['./signin.component.scss'], 
})
export default class SignupComponent {
  // Inyectamos el FormBuilder para construir el formulario.
  private _formBuilder = inject(FormBuilder);
  // Inyectamos el authservice para realizar operaciones de inicio de sesión.
  private _authService = inject(AuthService);
  // Inyectamos el Router para poder redirigir al usuario luego del inicio de sesión.
  private _router = inject(Router);

  // Definimos el form utilizando FormBuilder con los validadores de los campos.
  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control('', [
      Validators.required, // El campo es obligatorio.
      Validators.email     // Debe tener un formato de correo electrónico.
    ]),
    password: this._formBuilder.control('', Validators.required) // La contraseña es obligatoria.
  });

  // Metodo para enviar el form de inicio de sesión.
  async submit() {
    // Si el formulario es inválido, no se realiza ninguna acción.
    if (this.form.invalid) return;

    try {
      // Extraemos los valores de email y password del form.
      const { email, password } = this.form.value;
      // Verificamos que ambos valores existan, en caso contrario se termina la ejecución.
      if (!email || !password) return;

      // Llamamos al método signIn del authservice con el email y password.
      await this._authService.signIn({ email, password });

      toast.success('Iniciaste sesión con éxito');
      // Navegamos a la ruta '/tasks' tras un inicio de sesion exitoso.
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error('Hubo un error en el inicio de sesión');
    }
  }

  // Funcion auxiliar para verificar si un campo es requerido.
  // Utiliza un validador isRequired (definido en ../../utils/validators).
  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form);
  }

  // Funcion auxiliar para verificar errores en el campo de email.
  // Utiliza la función hasEmailError (definida en ../../utils/validators).
  hasEmailError() {
    return hasEmailError(this.form);
  }

  // Metodo para iniciar sesion utilizando Google.
  async submitWithGoogle() {
    try {
      // Se llama al método signInwithGoogle del authservice.
      await this._authService.signInwithGoogle();
      toast.success('Sesión iniciada con éxito');
      // Se navega a la ruta '/tasks'.
      this._router.navigateByUrl('/tasks');
    } catch (error) {
      toast.error("Ocurrió un error");
    }
  }
}

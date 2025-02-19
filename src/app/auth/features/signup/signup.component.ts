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
// Servicio de auth para registrar o iniciar sesión.
import { AuthService } from '../../data-access/auth.service';
// Librearia de notificaciones toast
import { toast } from 'ngx-sonner';
// Router y RouterLink para la navegación.
import { Router, RouterLink, RouterModule } from '@angular/router';
// Componente para el botón de inicio de sesión con Google.
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';

// Definimos la interfaz FormSignUp que representa la estructura del formulario
// para el inicio de sesión
interface FormSignUp {
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
  templateUrl: './signup.component.html', 
  styleUrls: ['./signup.component.scss']      
})
export default class SignupComponent {

  // Inyectamos FormBuilder para construir el form.
  private _formBuilder = inject(FormBuilder);
  // Inyectamos el authservice de auth para manejar el registro del usuario.
  private _authService = inject(AuthService);
  // Inyectamos el Router para redirigir al usuario después del registro.
  private _router = inject(Router);

  // Creamos el formulario con sus controles y validadores.
  form = this._formBuilder.group<FormSignUp>({
    email: this._formBuilder.control('', [
      Validators.required, // El campo es obligatorio.
      Validators.email     // Debe tener un formato de correo electrónico.
    ]),
    password: this._formBuilder.control('', Validators.required) // La contraseña es obligatoria.
  })

  // Metodo auxiliar para verificar si un campo es requerido.
  isRequired(field: 'email' | 'password'){
    return isRequired(field, this.form);
  }

  // Metodo auxiliar para verificar si hay un error de formato en el mail.
  hasEmailError(){
    return hasEmailError(this.form);
  }

  // Metodo para enviar el formulario de registro.
  // Si el formulario es válido, intenta registrar el usuario con el authservice de auth.
  async submit() {
    // Si el formulario es inválido, no se realiza ninguna acción.
    if(this.form.invalid) return;

    try {
      // Extraemos los valores del formulario.
      const { email, password } = this.form.value;

      // Si alguno de los campos es nulo, detenemos la ejecución.
      if(!email || !password) return;

      // Llamamos al metodo signUp del authservice de auth para registrar al usuario.
      await this._authService.signUp({ email, password });
      toast.success('Usuario creado con éxito');

      // Navegamos a la ruta '/tasks' tras el registro exitoso.
      this._router.navigateByUrl('/tasks');

    } catch(error) {
      toast.error('Hubo un error en la creación del usuario');
    }
  }

  // Metodo para iniciar sesión utilizando Google.
  // Llama al metodo signInwithGoogle del authservice.
  async submitWithGoogle(){
    try {
      await this._authService.signInwithGoogle();
      toast.success('Sesión iniciada con éxito');
      this._router.navigateByUrl('/tasks');
    } catch(error) {
      toast.error("Ocurrió un error");
    }
  }
}

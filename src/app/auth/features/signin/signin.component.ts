import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder } from '@angular/forms';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { hasEmailError, isRequired } from '../../utils/validators';
import { AuthService } from '../../data-access/auth.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { GoogleButtonComponent } from '../../ui/google-button/google-button.component';



export interface FormSignIn{
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

  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control('', [
      Validators.required, 
      Validators.email
    ]),
    password: this._formBuilder.control('', Validators.required),
  })


  async submit() {
    if(this.form.invalid) return;

    try{    
      const {email, password} = this.form.value;

    if(!email || !password) return;

    await this._authService.signIn({email, password});

    toast.success('Iniciaste sesion con exito');
    this._router.navigateByUrl('/tasks');
      
  } catch(error){
    toast.error('Hubo un error en el inicio de sesion');
  }

}

 isRequired(field: 'email' | 'password'){
  return isRequired(field, this.form);
  }

  hasEmailError(){
    return hasEmailError(this.form);
  }

  
  async submitWithGoogle(){
    try{
      await this._authService.signInwithGoogle();
      toast.success('Sesion iniciada con exito');
      this._router.navigateByUrl('/tasks');
    }catch(error){
      toast.error("Ocurrio un error");
    }

  }

}
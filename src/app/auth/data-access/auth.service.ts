import { inject, Injectable } from '@angular/core';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from '@angular/fire/auth';

// Define la interfaz User que representa un usuario con email y contraseña.
export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root' // Hace que el servicio se provea a nivel global en la aplicación.
})
export class AuthService {
  // Inyecta el Auth de Firebase para utilizarlo en los métodos de autenticación.
  private _auth = inject(Auth);

  // Método para registrar un nuevo usuario utilizando su mail y contraseña.
  signUp(user: User) {
    return createUserWithEmailAndPassword(
      this._auth,       // Auth de Firebase
      user.email,       // Email proporcionado por el usuario.
      user.password     // Contraseña proporcionada por el usuario.
    );
  }

  // Método para iniciar sesión con mail y contraseña.
  signIn(user: User) {
    return signInWithEmailAndPassword(
      this._auth,       
      user.email,      
      user.password     
    );
  }

  // Método para iniciar sesión con Google usando una ventana emergente.
  signInwithGoogle() {
    // Crea una instancia del proveedor de auth de Google.
    const provider = new GoogleAuthProvider();

    // Inicia el proceso de auth con Google mediante un popup.
    return signInWithPopup(this._auth, provider);
  }
}

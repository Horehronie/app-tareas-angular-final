import { inject, Injectable } from "@angular/core";
import { Auth, authState, getAuth, signOut } from "@angular/fire/auth";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible de forma global en la aplicación.
})
export class AuthStateService {
  // Inyectamos el authservice de Firebase para poder utilizarlo en las operaciones.
  private _auth = inject(Auth);

  /*
   * Devuelve un observable que emite el AuthState del usuario.
   * Utiliza la función `authState` de Firebase para monitorizar los cambios en la sesión.
   */
  get authState$(): Observable<any> {
    return authState(this._auth);
  }

  /*
   * Devuelve el usuario actual autenticado.
   * Utiliza `getAuth().currentUser` para obtener la información del usuario logueado.
   */
  get currentUser() {
    return getAuth().currentUser;
  }

  /*
   * Realiza la acción de cerrar sesión.
   * Llama a la función `signOut` pasando el servicio de autenticación inyectado.
   * Devuelve una promesa que se resuelve cuando la operación de cierre de sesión es exitosa.
   */
  logOut() {
    return signOut(this._auth);
  }
}

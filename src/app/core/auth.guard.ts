import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStateService } from "../shared/auth-state.service";
import { map } from "rxjs";

/*
 * Guardia de ruta privada.
 * Permite el acceso solo si el usuario está logueado.
 * Si el usuario no está autenticado, redirige a la pagina de inicio de sesión.
 */
export const privateGuard = (): CanActivateFn => {
  return () => {
    // Inyectamos el Router para poder redirigir
    const router = inject(Router);
    // Inyectamos el AuthStateService para verificar el estado del usuario
    const authState = inject(AuthStateService);

    // Utilizamos el observable authState$ para obtener el estado de autenticación
    return authState.authState$.pipe(
      map(state => {
        console.log("Estado de autenticación (privateGuard):", state);
        // Si no hay estado (usuario no autenticado)
        if (!state) {
          // Redirigimos a la página de inicio de sesión
          router.navigateByUrl('/auth/sign-in');
          return false;
        }
        // Si el usuario está autenticado, permitimos el acceso
        return true;
      })
    );
  };
};

/*
 * Guardia de ruta publica.
 * Permite el acceso solo si el usuario NO está autenticado.
 * Si el usuario está autenticado, se redirige a la ruta de tareas.
 */
export const publicGuard = (): CanActivateFn => {
  return () => {
    // Inyectamos el Router para realizar redirecciones
    const router = inject(Router);
    // Inyectamos el authservice para comprobar el estado del usuario
    const authState = inject(AuthStateService);

    // Observamos el estado de autenticación con el observable authState$
    return authState.authState$.pipe(
      map(state => {
        console.log("Estado de autenticación (publicGuard):", state);
        // Si el usuario está autenticado
        if (state) {
          // Redirigimos a la ruta de tareas
          router.navigateByUrl('/tasks');
          return false;
        }
        // Si el usuario no está autenticado, permitimos el acceso
        return true;
      })
    );
  };
};

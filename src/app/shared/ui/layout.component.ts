import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthStateService } from "../auth-state.service";


@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'app-layout',
    template: ' <button (click) = "logOut()">Salir</button> <router-outlet />',
})

export default class LayoutComponent{
    private _authState = inject(AuthStateService);
    private _router = inject(Router);
  
    async logOut(){
      await this._authState.logOut();
      this._router.navigateByUrl('/auth/sign-in');
    }
}
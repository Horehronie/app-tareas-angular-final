import { Routes } from "@angular/router";

export default [
    {
        path: 'sign-in',
        loadComponent: () => import('./signin/signin.component'),
    },    
    {
        path: 'sign-up',
        loadComponent: () => import('./signup/signup.component'),
    },
] as Routes;
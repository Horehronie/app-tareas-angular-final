import { Routes } from "@angular/router";

export default [
    {
        path: '',
        loadComponent: () => import('./task-list/task-list.component'),
    },    
    {
        path: 'new',
        loadComponent: () => import('./task-form/task-form.component'),
    },
    {
        path: 'edit/:idTask',
        loadComponent: () => import('./task-form/task-form.component'),
    },
    {
        path: 'delete/:idTask',
        loadComponent: () => import('./task-delete/task-delete.component'),
    },

] as Routes;
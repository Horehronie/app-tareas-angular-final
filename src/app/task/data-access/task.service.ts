import { inject, Injectable, signal } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';

export interface Task{
  id: string,
  titular: string,
  monto: number,
  estado: boolean,
  archivo: string; //url
}

export type TaskCreate = Omit<Task, 'id'>;

const PATH = 'tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _firestore = inject(Firestore);

  private _collection = collection(this._firestore, PATH);

  loading = signal<boolean>(true);

  getTasks = toSignal(
    (collectionData(this._collection, {idField: 'id'}) as Observable<Task[]>).pipe(
      tap(()=>{
        this.loading.set(false);
      }),
      catchError(error =>{
        this.loading.set(false);
        return throwError(()=>error);
      })
    ), 
    {initialValue: []});

  create(task: TaskCreate){
    return addDoc(this._collection, task);
  }
}

import { inject, Injectable, signal } from '@angular/core';
import { 
  Firestore, 
  collection, 
  addDoc, 
  collectionData, 
  doc, 
  getDoc, 
  updateDoc,
  deleteDoc 
} from '@angular/fire/firestore';
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

    getTask(id: string){
      const docRef = doc(this._collection, id);
      return getDoc(docRef);
    }

  create(task: TaskCreate){
    return addDoc(this._collection, task);
  }

  update(task: TaskCreate, id: string){
    const _docRef = doc(this._collection, id);
    return updateDoc(_docRef, task);
  }

  delete(id: string){
    const _docRef = doc(this._collection, id);
    return deleteDoc(_docRef);
  }
}

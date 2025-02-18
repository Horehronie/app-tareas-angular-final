import { inject, Injectable, signal } from '@angular/core';
import { 
  Firestore, 
  collection, 
  addDoc, 
  collectionData, 
  doc, 
  getDoc, 
  updateDoc,
  deleteDoc,
  query, 
  where
} from '@angular/fire/firestore';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import { AuthStateService } from '../../shared/auth-state.service';

export interface Task{
  id: string,
  titular: string,
  monto: number,
  estado: boolean,
  archivo: string; //url
}

export type TaskCreate = Omit<Task, 'id'>;

const PATH = 'tasks';

@Injectable()
export class TaskService {
  private _firestore = inject(Firestore);

  private _collection = collection(this._firestore, PATH);

  private _authState = inject(AuthStateService);

  private _query = query(
    this._collection,
    where('userId', '==', this._authState.currentUser?.uid)
  );


  loading = signal<boolean>(true);


  constructor(){
    this._authState.currentUser;
  }

  getTasks = toSignal(
    (collectionData(this._query, {idField: 'id'}) as Observable<Task[]>).pipe(
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
    return addDoc(this._collection, {
      ...task, 
      userId: this._authState.currentUser?.uid
    });
  }

  update(task: TaskCreate, id: string){
    const _docRef = doc(this._collection, id);
    return updateDoc(_docRef, {
      ...task, 
      userId: this._authState.currentUser?.uid
    });
  }

  delete(id: string){
    const _docRef = doc(this._collection, id);
    return deleteDoc(_docRef);
  }
}

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
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthStateService } from '../../shared/auth-state.service';

// Interfaz que define la estructura de una tarea(factura) en la app.
export interface Task {
  id: string,         
  titular: string,    
  monto: number,      
  estado: boolean,    
  archivo: string;    // URL del archivo asociado a la factura.
}

// Tipo que se utiliza para crear una nueva factura, omitiendo el campo 'id'
// ya que este se genera automáticamente en Firestore.
export type TaskCreate = Omit<Task, 'id'>;

// Constante que define el nombre de la colección en Firestore.
const PATH = 'tasks';

@Injectable() // Decorador que marca el servicio como inyectable (se usará en otros componentes).
export class TaskService {
  // Inyectamos el servicio de Firestore para interactuar con la base de datos.
  private _firestore = inject(Firestore);

  // Obtenemos una referencia a la colección "tasks" en Firestore.
  private _collection = collection(this._firestore, PATH);

  // Inyectamos el servicio que maneja el authstate del usuario.
  private _authState = inject(AuthStateService);

  // Creamos una consulta que filtra las facturas de la colección para mostrar
  // únicamente las que pertenecen al usuario logueado actualmente.
  // Se utiliza el campo "userId" en cada documento para realizar la comparación.
  private _query = query(
    this._collection,
    where('userId', '==', this._authState.currentUser?.uid)
  );

  // Creamos una signal para manejar el estado de carga de las facturas.
  // Inicialmente se establece en true para indicar que se está cargando la información.
  loading = signal<boolean>(true);

  // Constructor del servicio.
  // Sirve para observar el estado actual del usuario, aunque no se realiza ninguna acción adicional.
  constructor() {
    this._authState.currentUser;
  }

  // Método para obtener las facturas del usuario actual.
  // Se utiliza "collectionData" para convertir la consulta en un Observable de Task.
  // Luego se usa "toSignal" para transformar ese Observable en una signal, que se actualiza en la UI.
  // También se maneja el estado de carga y se capturan errores.
  getTasks = toSignal(
    (collectionData(this._query, { idField: 'id' }) as Observable<Task[]>).pipe(
      tap(() => {
        // Una vez que se reciben los datos, se establece loading en false.
        this.loading.set(false);
      }),
      catchError(error => {
        // En caso de error, se marca que la carga terminó y se propaga el error.
        this.loading.set(false);
        return throwError(() => error);
      })
    ), 
    { initialValue: [] } // Valor inicial de la signal: una lista vacía.
  );

  /**
   * Obtiene una factura específica dado su ID.
   * @param id - Identificador de la factura.
   * @returns Un Observable que contiene los datos del documento.
   */
  getTask(id: string) {
    // Se obtiene la referencia al documento dentro de la colección "tasks" con el ID proporcionado.
    const docRef = doc(this._collection, id);
    return getDoc(docRef);
  }

  /**
   * Crea una nueva factura en Firestore.
   * @param task - Objeto con los datos de la factura (sin incluir el ID).
   * Se añade también el campo "userId" para relacionar la factura con el usuario actual.
   */
  create(task: TaskCreate) {
    return addDoc(this._collection, {
      ...task, 
      userId: this._authState.currentUser?.uid // Se asigna el ID del usuario actual.
    });
  }

  /**
   * Actualiza una factura existente en Firestore.
   * @param task - Objeto con los nuevos datos de la factura (sin el ID).
   * @param id - Identificador de la factura a actualizar.
   * Se actualiza el documento y se vuelve a asignar el "userId" del usuario actual.
   */
  update(task: TaskCreate, id: string) {
    // Se obtiene la referencia al documento a actualizar.
    const _docRef = doc(this._collection, id);
    return updateDoc(_docRef, {
      ...task, 
      userId: this._authState.currentUser?.uid
    });
  }

  /**
   * Elimina una factura de Firestore.
   * @param id - Identificador de la factura que se desea eliminar.
   */
  delete(id: string) {
    // Se obtiene la referencia al documento y se elimina.
    const _docRef = doc(this._collection, id);
    return deleteDoc(_docRef);
  }
}

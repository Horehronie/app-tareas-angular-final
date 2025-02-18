import { Injectable } from '@angular/core';
import { Storage, getStorage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private storage: Storage;

  constructor() {
    // Inicializa el almacenamiento
    this.storage = getStorage();
  }

  uploadFile(file: File) {
    return new Observable<string>((observer) => {
      const storageRef = ref(this.storage, `uploads/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Puedes agregar algo aquí si necesitas saber el estado de la carga
        },
        (error) => {
          observer.error(error);
        },
        () => {
          // Cuando la carga termina correctamente
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            observer.next(downloadURL); // Pasamos la URL de descarga
            observer.complete();
          });
        }
      );
    });
  }
}


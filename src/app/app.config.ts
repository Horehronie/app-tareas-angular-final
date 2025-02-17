import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({
        "projectId":"tareas-angular-final",
        "appId":"1:1052580040029:web:616e7a563839fcfd54acb4","storageBucket":"tareas-angular-final.firebasestorage.app","apiKey":"AIzaSyBM1TJtrZMhC7Vyksz8ARCXn7WEwpRZ4mI",
        "authDomain":"tareas-angular-final.firebaseapp.com",
        "messagingSenderId":"1052580040029"
      })
    ), 
      provideAuth(() => getAuth()), 
      provideFirestore(() => getFirestore()), provideAnimationsAsync(), provideAnimationsAsync()
    ]
};

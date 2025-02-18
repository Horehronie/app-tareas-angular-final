import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

const firebaseConfig = {
  projectId: "tareas-angular-final",
  appId: "1:1052580040029:web:616e7a563839fcfd54acb4",
  storageBucket: "tareas-angular-final.firebasestorage.app",
  apiKey: "AIzaSyBM1TJtrZMhC7Vyksz8ARCXn7WEwpRZ4mI",
  authDomain: "tareas-angular-final.firebaseapp.com",
  messagingSenderId: "1052580040029"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(), 
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ]
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { AcercaComponent } from './acerca/acerca.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { FireServiceProvider } from 'src/providers/api-service/fire-service';

import { AngularFireModule } from '@angular/fire/compat';
import { FirebaseAuthService } from 'src/providers/api-service/firebase-auth-service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';




@NgModule({
  declarations: [
    AppComponent,
    AcercaComponent,
    NavbarComponent,
    LoginComponent,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,


    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebaseConfig),AngularFirestoreModule ],
  providers: [FireServiceProvider,FirebaseAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './pages/login/login.component';
import { MatInputModule } from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import { HomeComponent } from './pages/user/home/home.component';
import { TestComponent } from './pages/user/test/test.component';
import { UserComponent } from './pages/user/user.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatStepperModule} from "@angular/material/stepper";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatListModule} from "@angular/material/list";

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatStepperModule
]

const pages = [
  LoginComponent,
  // HomeComponent,
  TestComponent,
  UserComponent
]

@NgModule({
  declarations: [
    AppComponent,
    ...pages
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ...materialModules,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModules } from './material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StartComponent } from './pages/start/start.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './components/navbar/navbar.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { UserComponent } from './pages/user/user.component';
import { InfoComponent } from './pages/info/info.component';
import { IdCreateComponent } from './pages/id/id-create/id-create.component';
import { IdReadComponent } from './pages/id/id-read/id-read.component';
import { IdUpdateComponent } from './pages/id/id-update/id-update.component';
import { IdListComponent } from './pages/id-list/id-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StartComponent,
    NavbarComponent,
    UserComponent,
    InfoComponent,
    IdCreateComponent,
    IdReadComponent,
    IdUpdateComponent,
    IdListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp({ "projectId": "pockid-01", "appId": "1:1056023789035:web:29adb5a815abf797e62dae", "storageBucket": "pockid-01.appspot.com", "apiKey": "AIzaSyASZ3ZsRDthtEZmT6TIv7799KixO2qTleg", "authDomain": "pockid-01.firebaseapp.com", "messagingSenderId": "1056023789035", "measurementId": "G-JYV1RK4LJN" })),
    provideAnalytics(() => getAnalytics())
  ],
  providers: [
    provideAnimationsAsync(),
    ScreenTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

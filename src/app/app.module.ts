import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModules } from './material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StartComponent } from './pages/start/start.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './pages/user/user.component';
import { InfoComponent } from './pages/info/info.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PropertyCreateComponent } from './pages/properties/property-create/property-create.component';
import { PropertyListComponent } from './pages/properties/property-list/property-list.component';
import { TenantCreateComponent } from './pages/tenants/tenant-create/tenant-create.component';
import { TenantListComponent } from './pages/tenants/tenant-list/tenant-list.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { RentCollectComponent } from './pages/rents/rent-collect/rent-collect.component';
import { MaintenanceCreateComponent } from './pages/maintenance/maintenance-create/maintenance-create.component';
import { TenantInfoComponent } from './pages/tenants/tenant-info/tenant-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StartComponent,
    NavbarComponent,
    UserComponent,
    InfoComponent,
    PropertyCreateComponent,
    PropertyListComponent,
    TenantCreateComponent,
    TenantListComponent,
    RentCollectComponent,
    MaintenanceCreateComponent,
    TenantInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    /*    provideFirebaseApp(() => initializeApp({ "projectId": "pockid-01", "appId": "1:1056023789035:web:29adb5a815abf797e62dae", "storageBucket": "pockid-01.appspot.com", "apiKey": "AIzaSyASZ3ZsRDthtEZmT6TIv7799KixO2qTleg", "authDomain": "pockid-01.firebaseapp.com", "messagingSenderId": "1056023789035", "measurementId": "G-JYV1RK4LJN" })),
       provideAnalytics(() => getAnalytics()), */
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    provideAnimationsAsync(),
    ScreenTrackingService,
    provideFirebaseApp(() => initializeApp({"projectId":"popati","appId":"1:472649861457:web:54a3b7267f800b74c1ab70","storageBucket":"popati.appspot.com","apiKey":"AIzaSyD3yJZ55x-1TUNUhgnBSR8CEiM7__LQbXE","authDomain":"popati.firebaseapp.com","messagingSenderId":"472649861457","measurementId":"G-3R8XS9CYYS"})),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    UserTrackingService,
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

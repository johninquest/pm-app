import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModules } from './material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
/* import { StartComponent } from './pages/start/start.component'; */
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './pages/user/user.component';
import { InfoComponent } from './pages/info/info.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PropertyCreateComponent } from './pages/properties/property-create/property-create.component';
import { PropertyListComponent } from './pages/properties/property-list/property-list.component';
import { TenantCreateComponent } from './pages/tenants/tenant-create/tenant-create.component';
import { TenantListComponent } from './pages/tenants/tenant-list/tenant-list.component';
/* import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; */
import { TenantInfoComponent } from './pages/tenants/tenant-info/tenant-info.component';
import { ExpenseCreateComponent } from './pages/expenses/expense-create/expense-create.component';
import { ExpenseListComponent } from './pages/expenses/expense-list/expense-list.component';
import { VersionComponent } from './components/version/version.component';
import { AuthComponent } from './pages/auth/auth.component';
import { EmailComponent } from './components/email/email.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { PropertyDetailsComponent } from './pages/properties/property-details/property-details.component';
import { PropertyTypePipe } from './shared/pipes/property-type.pipe';
import { PrivacyNoticeComponent } from './pages/privacy-notice/privacy-notice.component';
import { ExpenseDetailsComponent } from './pages/expenses/expense-details/expense-details.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { RentCreateComponent } from './pages/rents/rent-create/rent-create.component';
import { RentDetailsComponent } from './pages/rents/rent-details/rent-details.component';
import { RentListComponent } from './pages/rents/rent-list/rent-list.component';
import { CountryPipe } from './shared/pipes/country.pipe';
import { CurrencyPipe } from './shared/pipes/currency.pipe';
import { UnitCreateComponent } from './pages/units/unit-create/unit-create.component';
import { UnitDetailsComponent } from './pages/units/unit-details/unit-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    /* StartComponent, */
    NavbarComponent,
    UserComponent,
    InfoComponent,
    PropertyCreateComponent,
    PropertyListComponent,
    TenantCreateComponent,
    TenantListComponent,
    TenantInfoComponent,
    ExpenseCreateComponent,
    ExpenseListComponent,
    VersionComponent,
    AuthComponent,
    EmailComponent,
    AlertDialogComponent,
    PropertyDetailsComponent,
    PropertyTypePipe,
    PrivacyNoticeComponent,
    ExpenseDetailsComponent,
    PageTitleComponent,
    RentCreateComponent,
    RentDetailsComponent,
    RentListComponent,
    CountryPipe,
    CurrencyPipe,
    UnitCreateComponent,
    UnitDetailsComponent,
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
   /*
    ScreenTrackingService,
    provideFirebaseApp(() => initializeApp({"projectId":"popati","appId":"1:472649861457:web:54a3b7267f800b74c1ab70","storageBucket":"popati.appspot.com","apiKey":"AIzaSyD3yJZ55x-1TUNUhgnBSR8CEiM7__LQbXE","authDomain":"popati.firebaseapp.com","messagingSenderId":"472649861457","measurementId":"G-3R8XS9CYYS"})),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    UserTrackingService,
    provideFirestore(() => getFirestore()) */
  ],
  bootstrap: [AppComponent],
  exports: [
    PropertyTypePipe
  ]
})
export class AppModule { }

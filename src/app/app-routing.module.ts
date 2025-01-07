import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
/* import { StartComponent } from './pages/start/start.component'; */
import { UserComponent } from './pages/user/user.component';
import { InfoComponent } from './pages/info/info.component';
import { PropertyListComponent } from './pages/properties/property-list/property-list.component';
import { PropertyCreateComponent } from './pages/properties/property-create/property-create.component';
import { PropertyDetailsComponent } from './pages/properties/property-details/property-details.component';
import { TenantListComponent } from './pages/tenants/tenant-list/tenant-list.component';
import { TenantCreateComponent } from './pages/tenants/tenant-create/tenant-create.component';
import { TenantInfoComponent } from './pages/tenants/tenant-info/tenant-info.component';
import { ExpenseCreateComponent } from './pages/expenses/expense-create/expense-create.component';
import { ExpenseListComponent } from './pages/expenses/expense-list/expense-list.component';
import { AuthComponent } from './pages/auth/auth.component';
import { EmailComponent } from './components/email/email.component';
import { PrivacyNoticeComponent } from './pages/privacy-notice/privacy-notice.component';
import { authGuard } from './guards/auth.guard';
import { ExpenseDetailsComponent } from './pages/expenses/expense-details/expense-details.component'; 
import { RentListComponent } from './pages/rents/rent-list/rent-list.component'; 
import { RentCreateComponent } from './pages/rents/rent-create/rent-create.component';


const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent,
    data: { title: 'auth' },
  },
  {
    path: 'auth/email',
    component: EmailComponent,
    data: { title: 'Login via Email' },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home',
    },
    canActivate: [authGuard]
  },
  {
    path: 'info',
    component: InfoComponent,
    data: {
      title: 'Info | Why Popati?',
    },
  },
  {
    path: 'expense-create',
    component: ExpenseCreateComponent,
    data: {
      title: 'New expense',
    },
  },
  {
    path: 'expenses',
    component: ExpenseListComponent,
    data: {
      title: 'Expenses',
    },
  },
  {
    path: 'expense/:id',
    component: ExpenseDetailsComponent,
    data: {
      title: 'Expense details',
    },
  },
  {
    path: 'properties',
    component: PropertyListComponent,
    data: {
      title: 'Properties',
    },
  },
  {
    path: 'property-create',
    component: PropertyCreateComponent,
    data: {
      title: 'Add new property',
    },
  },
  {
    path: 'property/:id',
    component: PropertyDetailsComponent,
    data: {
      title: 'Property details',
    },
  },
  {
    path: 'tenants',
    component: TenantListComponent,
    data: {
      title: 'Tenants',
    },
  },
  {
    path: 'tenant-create',
    component: TenantCreateComponent,
    data: {
      title: 'Add new tenant',
    },
  },
  {
    path: 'tenant-info',
    component: TenantInfoComponent,
    data: {
      title: 'Tenant information',
    },
  },
  {
    path: 'rents',
    component: RentListComponent,
    data: {
      title: 'Rent list',
    },
  }, 
  {
    path: 'rent-create',
    component: RentCreateComponent,
    data: {
      title: 'Rent collect',
    },
  },
  {
    path: 'user',
    component: UserComponent,
    data: {
      title: 'User',
    },
  },
  {
    path: 'privacy',
    component: PrivacyNoticeComponent,
    data: {
      title: 'Privacy Notice',
    },
  },
  /* {
    path: '**',
    component: PageNotFoundComponent,
    data: { titie: 'Page not found!' },
  }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

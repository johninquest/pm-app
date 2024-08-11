import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StartComponent } from './pages/start/start.component';
import { UserComponent } from './pages/user/user.component';
import { InfoComponent } from './pages/info/info.component';
import { PropertyListComponent } from './pages/properties/property-list/property-list.component';
import { PropertyCreateComponent } from './pages/properties/property-create/property-create.component';
import { TenantListComponent } from './pages/tenants/tenant-list/tenant-list.component';
import { TenantCreateComponent } from './pages/tenants/tenant-create/tenant-create.component';
import { RentCollectComponent } from './pages/rents/rent-collect/rent-collect.component';
import { MaintenanceCreateComponent } from './pages/maintenance/maintenance-create/maintenance-create.component';
import { TenantInfoComponent } from './pages/tenants/tenant-info/tenant-info.component';


const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  {
    path: 'start',
    component: StartComponent,
    data: { title: 'ProMa' },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home',
    },
  },
  {
    path: 'info',
    component: InfoComponent,
    data: {
      title: 'Info | Why Popati?',
    },
  }, 

  {
    path: 'maintenance-create',
    component: MaintenanceCreateComponent,
    data: {
      title: 'New maintenance',
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
    path: 'rent-collect',
    component: RentCollectComponent,
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

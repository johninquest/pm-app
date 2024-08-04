import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StartComponent } from './pages/start/start.component';
import { UserComponent } from './pages/user/user.component';
import { InfoComponent } from './pages/info/info.component';
import { IdCreateComponent } from './pages/id/id-create/id-create.component';
import { IdListComponent } from './pages/id-list/id-list.component';
import { PropertyListComponent } from './pages/properties/property-list/property-list.component';
import { TenantListComponent } from './pages/tenants/tenant-list/tenant-list.component';


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
      title: 'Info | Why ProMa?',
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
    path: 'tenants',
    component: TenantListComponent,
    data: {
      title: 'Tenants',
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

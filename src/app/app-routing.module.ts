import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StartComponent } from './pages/start/start.component';
import { UserComponent } from './pages/user/user.component';
import { InfoComponent } from './pages/info/info.component';
import { IdCreateComponent } from './pages/id/id-create/id-create.component';
import { IdListComponent } from './pages/id-list/id-list.component';
import { WaitlistComponent } from './pages/waitlist/waitlist.component';

const routes: Routes = [
  { path: '', redirectTo: '/waitlist', pathMatch: 'full' },
  {
    path: 'start',
    component: StartComponent,
    data: { title: 'PockID' },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home',
    },
  },
  {
    path: 'id-create',
    component: IdCreateComponent,
    data: {
      title: 'New ID',
    },
  },
  {
    path: 'id-list',
    component: IdListComponent,
    data: {
      title: 'ID List',
    },
  },
  {
    path: 'info',
    component: InfoComponent,
    data: {
      title: 'Info | Why PockID ?',
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
    path: 'waitlist',
    component: WaitlistComponent,
    data: {
      title: 'Waitlist',
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

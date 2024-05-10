import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StartComponent } from './pages/start/start.component';
import { UserComponent } from './pages/user/user.component';
import { InfoComponent } from './pages/info/info.component';

const routes: Routes = [
  /* { path: '', redirectTo: '/', pathMatch: 'full' }, */
  {
    path: '',
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
export class AppRoutingModule {}

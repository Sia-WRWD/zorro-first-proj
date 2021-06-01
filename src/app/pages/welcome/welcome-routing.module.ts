import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RegisterAComponent } from '../register-a/register-a.component';
import { RegisterUComponent } from '../register-u/register-u.component';
import { RegisterComponent } from '../register/register.component';
import { UserComponent } from '../user/user.component';
import { WelcomeComponent } from './welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch:'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'user', component: UserComponent },
      { path: 'registerA', component: RegisterAComponent},
      { path: 'registerU', component: RegisterUComponent},
      { path: 'register', component: RegisterComponent},
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }

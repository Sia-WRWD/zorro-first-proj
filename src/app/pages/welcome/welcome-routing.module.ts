import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterFailComponent } from 'src/app/message/register-fail/register-fail.component';
import { RegisterSuccessComponent } from 'src/app/message/register-success/register-success.component';
import { AccProfileComponent } from '../acc-profile/acc-profile.component';
import { ActivityLogsComponent } from '../activity-logs/activity-logs.component';
import { AdminComponent } from '../admin/admin.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RegisterComponent } from '../register/register.component';
import { UserComponent } from '../user/user.component';
import { WebAnalyticsComponent } from '../web-analytics/web-analytics.component';
import { WelcomeComponent } from './welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch:'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'user', component: UserComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'register-success', component: RegisterSuccessComponent },
      { path: 'register-fail', component: RegisterFailComponent },
      { path: 'web-analytics', component: WebAnalyticsComponent },
      { path: 'activity-logs', component: ActivityLogsComponent },
      { path: 'acc-profile', component: AccProfileComponent },

    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }

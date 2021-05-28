import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './pages/form/form.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/login'},
    { path: 'login', component: LoginComponent },
    { path: 'form', component: FormComponent },
    { path: 'welcome', component: WelcomeComponent }

//   { path: '', pathMatch: 'full', redirectTo: '/welcome' },
//   { path: 'form', component: FormComponent},
//   { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateContentComponent } from './pages/create-content/create-content.component';

const routes: Routes = [
  {path:'', redirectTo:'/register', pathMatch:'full' },
  {path:'navbar', component:NavbarComponent},
  {path:"login", component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:'createContent', component:CreateContentComponent},
  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

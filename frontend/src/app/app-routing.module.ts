import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateContentComponent } from './pages/create-content/create-content.component';
import { authGuardService } from './authentication/auth.guard';
import { CreteUserComponent } from './pages/crete-user/crete-user.component';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { roleGuard } from './authentication/role.guard';

const routes: Routes = [
  {path:'', redirectTo:'/register', pathMatch:'full' },
  {path:"login", component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path:"dashboard", component:DashboardComponent, canActivate:[authGuardService]},
  // {path:'createContent', component:CreateContentComponent, canActivate:[authGuardService]},
  {path:'createContent', component:CreateContentComponent},
  {path:'createUser', component: CreteUserComponent, canActivate:[authGuardService]},
  {path: 'manageUser', component: ManageUsersComponent , canActivate:[roleGuard], data:{ expectedRole: 'admin' } },
  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


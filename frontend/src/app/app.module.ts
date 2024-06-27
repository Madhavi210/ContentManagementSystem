import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateContentComponent } from './pages/create-content/create-content.component';
import { OverViewSectionComponent } from './pages/over-view-section/over-view-section.component';
import { FileContainerComponent } from './pages/file-container/file-container.component';
import { ErrorInterceptor } from './core/utilities/error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';
import { AngularEditorComponent, AngularEditorModule } from '@kolkov/angular-editor';
import { CreteUserComponent } from './pages/crete-user/crete-user.component';
import { ActionCellRendererComponent } from './pages/action-cell-renderer/action-cell-renderer.component';
import { AgGridModule } from 'ag-grid-angular';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    DashboardComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    CreateContentComponent,
    OverViewSectionComponent,
    FileContainerComponent,
    ManageUsersComponent,
    CreteUserComponent,
    ActionCellRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularEditorModule,
    AgGridModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

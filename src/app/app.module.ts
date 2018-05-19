import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NewTaskComponent } from './components/modal/newtask/newtask.component';
import { TaskComponent } from './components/modal/task/task.component';

import { AuthenticateService } from './services/authenticate.service';
import { UserSerivce } from './services/user.service';
import { TaskSerivce } from './services/task.service';
import { GoogleMapService } from './services/google-map.service';
import { GooglePlacesService } from './services/google-places.service';

import { LayoutModule } from '@angular/cdk/layout';
import { AddTaskComponent } from './components/task/add-task/add-task.component';
import { ShowTaskComponent } from './components/task/show-task/show-task.component';
import { UserTasksComponent } from './components/task/user-tasks/user-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    SidebarComponent,
    NewTaskComponent,
    TaskComponent,
    AddTaskComponent,
    ShowTaskComponent,
    UserTasksComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        // { path: 'about', component: AboutComponent, pathMatch: 'full' },
        // { path: 'contact', component: ContactComponent, pathMatch: 'full' },
        {
          path: 'login',
          component: LoginComponent,
          pathMatch: 'full',
          canActivate: [UserSerivce]
        },
        {
          path: 'register',
          component: RegisterComponent,
          pathMatch: 'full',
          canActivate: [UserSerivce]
        },
        { path: '', component: HomeComponent },
        { path: '**', redirectTo: '', pathMatch: 'full' }
      ],
      { enableTracing: false }
    ),
    LayoutModule
  ],
  providers: [
    AuthenticateService,
    UserSerivce,
    TaskSerivce,
    GoogleMapService,
    GooglePlacesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

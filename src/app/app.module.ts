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
import { NewTaskComponent } from './components/modal/newtask/newtask.component';
import { TaskComponent } from './components/modal/task/task.component';

import { HomeService } from './services/home.service';
import { AuthenticateService } from './services/authenticate.service';
import { UserSerivce } from './services/user.service';
import { TaskSerivce } from './services/task.service';

import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    NewTaskComponent,
    TaskComponent
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
        { path: 'login', component: LoginComponent, pathMatch: 'full' },
        { path: 'register', component: RegisterComponent, pathMatch: 'full' },
        { path: '', component: HomeComponent },
        { path: '**', redirectTo: '', pathMatch: 'full' }
      ],
      { enableTracing: false }
    ),
    LayoutModule
  ],
  providers: [HomeService, AuthenticateService, UserSerivce, TaskSerivce],
  bootstrap: [AppComponent]
})
export class AppModule {}

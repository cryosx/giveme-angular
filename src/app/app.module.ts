import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAiZ34AYc_-ZoJW2FDhczdX96tvGAs7Ch0'
    }),
    RouterModule.forRoot(
      [
        // { path: 'about', component: AboutComponent, pathMatch: 'full' },
        // { path: 'contact', component: ContactComponent, pathMatch: 'full' },
        { path: '', component: HomeComponent },
        { path: '**', redirectTo: '', pathMatch: 'full' }
      ],
      { enableTracing: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { UrlComponent } from './url/url.component';
import { UrlCreateComponent } from './url-create/url-create.component';
import { httpInterceptorProviders } from './http-interceptor';

@NgModule({
  declarations: [AppComponent, LoginComponent, UrlComponent, UrlCreateComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

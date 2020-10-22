import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';   
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { QRCodeModule } from 'angularx-qrcode';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { UrlCreateComponent } from './url-create/url-create.component';
import { UrlComponent } from './url/url.component';
import { UrlRedirectComponent } from './url-redirect/url-redirect.component';
import { UrlQRCodeComponent } from './url-qrcode/url-qrcode.component';
import { httpInterceptorProviders } from './http-interceptor';

@NgModule({
  declarations: [AppComponent, LoginComponent, UrlCreateComponent, UrlComponent, UrlRedirectComponent, UrlQRCodeComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    QRCodeModule,
    RouterModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

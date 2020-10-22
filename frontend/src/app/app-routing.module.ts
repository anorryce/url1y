import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';   
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UrlComponent } from './url/url.component';
import { UrlCreateComponent } from './url-create/url-create.component';
import { UrlRedirectComponent } from './url-redirect/url-redirect.component';
import { UrlQRCodeComponent } from './url-qrcode/url-qrcode.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'create', pathMatch: 'full' },
  //{ path: 'login', component: LoginComponent },
  { path: '', component: UrlComponent },
  { path: '', component: UrlCreateComponent, outlet:'primary-outlet' },
  { path: ':shortUrl', component: UrlRedirectComponent },
  { path: 'qrcode/:shortUrl', component: UrlQRCodeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule, CommonModule],
  exports: [RouterModule, BrowserModule, CommonModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UrlComponent } from './url/url.component';
import { UrlCreateComponent } from './url-create/url-create.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'create', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'url', component: UrlComponent },
  { path: '', component: UrlCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule, BrowserModule]
})
export class AppRoutingModule { }

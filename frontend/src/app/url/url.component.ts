import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { APIService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-hello',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit {
  $urls: Observable<any>;
  helloMessage: Array<any>;

  constructor(
    private apiService: APIService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    // Example API call showing an Hello World
    this.$urls = this.apiService.getPublicUrls();

    this.$urls.subscribe(
      // Show API response
      url => {
        console.log(url);
        this.helloMessage = url[0].longUrl;
      },
      // Log error message and redirect to login
      (error: HttpErrorResponse) => {
        console.error(error);
        if (error.status === 401) {
          return this.router.navigate(['']);
        }
      }
    );
  }

  onGoBack() {
    return this.router.navigate(['']);
  }
}
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { APIService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-url-create',
  templateUrl: './url-create.component.html',
  styleUrls: ['./url-create.component.css']
})
export class UrlCreateComponent implements OnInit {
  url = {
    long_url: ''
  };
  submitted = false;

  constructor(
    private apiService: APIService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  createUrl(): void {
    const data = {
      long_url: this.url.long_url
    };

    this.apiService.createPublicUrl(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newUrl(): void {
    this.submitted = false;
    this.url = {
      long_url: ''
    };
  }

}
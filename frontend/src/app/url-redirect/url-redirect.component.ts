import { Component, OnInit } from '@angular/core';
import {  takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { APIService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-url-redirect',
  templateUrl: './url-redirect.component.html',
  styleUrls: ['./url-redirect.component.css']
})
export class UrlRedirectComponent implements OnInit {
  shortUrl: string;

  constructor(
    private apiService: APIService,
    private actRoute: ActivatedRoute) {
    this.shortUrl = this.actRoute.snapshot.params.shortUrl;
  }

  ngOnInit() {
    this.apiService.getPublicUrlByShort(this.shortUrl)
      .subscribe(
        response => {
          console.log(response);
          window.location = response.longUrl;
        },
        error => {
          console.log(error);
        });
  }
}
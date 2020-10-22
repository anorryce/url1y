import { Component, OnInit } from '@angular/core';
import {  takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { APIService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-url-qrcode',
  templateUrl: './url-qrcode.component.html',
  styleUrls: ['./url-qrcode.component.css']
})
export class UrlQRCodeComponent implements OnInit {
  myAngularxQrCode: string = "";
  shortUrl: string;
  longUrl: string;
  elementType: "img" | "url" | "canvas" | "svg" = null;
  level: "L" | "M" | "Q" | "H";
  scale: number;
  width: number;
  isLoaded: boolean = false;

  constructor(
    private apiService: APIService,
    private actRoute: ActivatedRoute) {
    this.shortUrl = this.actRoute.snapshot.params.shortUrl;
    this.elementType = "img";
    this.level = "M";
    this.scale = 1;
    this.width = 256;
  }

  ngOnInit() {
    this.apiService.getPublicUrlByShort(this.shortUrl)
      .subscribe(
        response => {
          console.log(response);
          this.myAngularxQrCode = response.longUrl;
          this.isLoaded = true;
        },
        error => {
          console.log(error);
        });
  }

  changeElementType(newValue: "img" | "url" | "canvas" | "svg"): void {
    this.elementType = newValue;
  }

  changeLevel(newValue: "L" | "M" | "Q" | "H"): void {
    this.level = newValue;
  }

  changeQrdata(newValue: string): void {
    this.myAngularxQrCode = newValue;
  }

  changeScale(newValue: number): void {
    this.scale = newValue;
  }

  changeWidth(newValue: number): void {
    this.width = newValue;
  }
}
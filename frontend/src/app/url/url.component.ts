import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import {  takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { APIService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-urls',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit {
  urlList: Observable<any>;
  editField: string;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private apiService: APIService,
    private tokenService: TokenService,
    private router: Router,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.readUrls();
  }

  readUrls(): void {
    this.urlList = this.apiService.getPublicUrls();
  }

  /*
  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }
  */

  remove(shortUrl: any) {
    this.apiService.deletePublicUrl(shortUrl).subscribe(
        response => {
          console.log(response);
          this.readUrls();
        },
        error => {
          console.log(error);
        });
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  qrcode(shortUrl: any){
    this.zone.run(() => { this.router.navigate(['/qrcode', shortUrl]); });
  }
}
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

interface CredentialsType {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private httpClient: HttpClient) { }

  postCredentials(
    credentials: CredentialsType
  ): Observable<{ token?: string }> {
    return this.httpClient.post(environment.server + '/api/login_check', credentials);
  }

  getPublicUrls(): Observable<any> {
    return this.httpClient.get(environment.server + '/');
  }

  createPublicUrl(data): Observable<any> {
    return this.httpClient.post(environment.server + '/',data);
  }

  deletePublicUrl(shortUrl): Observable<any> {
    return this.httpClient.delete(environment.server + '/delete/' + shortUrl);
  }

  searchByUrl(shortUrl): Observable<any> {
    return this.httpClient.get(environment.server + '/find/' + shortUrl);
  }
}
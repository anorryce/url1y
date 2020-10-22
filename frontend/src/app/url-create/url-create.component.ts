import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import { APIService } from '../api.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-url-create',
  templateUrl: './url-create.component.html',
  styleUrls: ['./url-create.component.css']
})
export class UrlCreateComponent {
  form: FormGroup = new FormGroup({});
  baseUrl: string = '';

  constructor(
    private apiService: APIService,
    private fb: FormBuilder
  ) {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.form = fb.group({
      long_url: ['', [Validators.required, Validators.pattern(reg)]]
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.apiService.createPublicUrl({long_url: this.form.value.long_url})
      .subscribe(
        response => {
          this.form.reset();
          window.location.reload();
        },
        error => {
          console.log(error);
        });
  }

}
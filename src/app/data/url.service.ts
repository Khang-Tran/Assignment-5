import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class UrlService {

  constructor() {
  }

  getUrl(): string {
    return 'https://boiling-fortress-29750.herokuapp.com';
  }
}

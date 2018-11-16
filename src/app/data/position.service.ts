import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Position } from './position';
import { Observable } from 'rxjs';
import { UrlService } from './url.service';

@Injectable()
export class PositionService {

  constructor(private http: HttpClient, private urlService: UrlService) {
  }

  getPositions(): Observable<Position[]> {
    const url = `${this.urlService.getUrl()}/positions`;
    return this.http.get<Position[]>(url);
  }


}

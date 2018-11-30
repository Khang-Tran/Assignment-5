import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Position } from './position';
import { Observable } from 'rxjs';
import { UrlService } from './url.service';

@Injectable()
export class PositionService {

  private readonly rootUrl: string = '';

  constructor(private http: HttpClient, private urlService: UrlService) {
    this.rootUrl = this.urlService.getUrl();
  }

  getPositions(): Observable<Position[]> {
    const url = `${this.urlService.getUrl()}/positions`;
    return this.http.get<Position[]>(url);
  }

  savePosition(position: Position): Observable<any> {
    const id = position._id;
    const url = `${this.rootUrl}/position/${id}`;
    return this.http.put<any>(url, position);
  }

  getPosition(id: string): Observable<Position[]> {
    const url = `${this.rootUrl}/position/${id}`;
    return this.http.get<Position[]>(url);
  }


}

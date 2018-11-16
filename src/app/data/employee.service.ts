import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  constructor(private http: HttpClient, private urlService: UrlService) {
  }

  getEmployees(): Observable<Employee[]> {
    const url = `${this.urlService.getUrl()}/employees`;
    return this.http.get<Employee[]>(url);
  }
}

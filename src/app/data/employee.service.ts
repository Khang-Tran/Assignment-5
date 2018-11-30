import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { UrlService } from './url.service';
import { EmployeeRaw } from './employeeRaw';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly rootUrl: string = '';

  constructor(private http: HttpClient, private urlService: UrlService) {
    this.rootUrl = this.urlService.getUrl();
  }

  getEmployees(): Observable<Employee[]> {
    const url = `${this.rootUrl}/employees`;
    return this.http.get<Employee[]>(url);
  }

  saveEmployee(employee: EmployeeRaw): Observable<any> {
    const id = employee._id;
    const url = `${this.rootUrl}/employee/${id}`;
    return this.http.put<any>(url, employee);
  }

  getEmployee(id: string): Observable<EmployeeRaw[]> {
    const url = `${this.rootUrl}/employee-raw/${id}`;
    return this.http.get<EmployeeRaw[]>(url);
  }
}

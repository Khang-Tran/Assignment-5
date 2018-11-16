import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  employees: Employee[];
  getEmployeesSub: any;
  loadingError: boolean;

  constructor(private employeeService: EmployeeService) {
    this.employees = [];
    this.getEmployeesSub = undefined;
    this.loadingError = false;
  }

  ngOnInit() {
    this.getEmployeesSub = this.employeeService
      .getEmployees()
      .subscribe(employees => this.employees = employees,
        () => this.loadingError = true
      );
  }

  ngOnDestroy() {
    if (this.getEmployeesSub !== undefined) {
      this.getEmployeesSub.unsubscribe();
    }
  }
}

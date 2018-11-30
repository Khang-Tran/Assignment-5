import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  employees: Employee[];
  getEmployeesSub: any;
  loadingError: boolean;
  filteredEmployees: Employee[];

  constructor(private employeeService: EmployeeService, private router: Router) {
    this.employees = [];
    this.getEmployeesSub = undefined;
    this.loadingError = false;
  }

  ngOnInit() {
    this.getEmployeesSub = this.employeeService
      .getEmployees()
      .subscribe(employees => this.employees = this.filteredEmployees = employees,
        () => this.loadingError = true
      );
  }

  routeEmployee(id: string) {
    this.router.navigate(['/employee', id]);
  }

  onEmployeeSearchKeyUp(event: any) {
    const {value} = event.target;
    const substring: string = value.toLowerCase();
    this.filteredEmployees = this.employees.filter(
      emp => emp.FirstName.toLowerCase().indexOf(substring) !== -1
        || emp.LastName.toLowerCase().indexOf(substring) !== -1
        || emp.Position.PositionName.toLowerCase().indexOf(substring) !== -1);
  }

  ngOnDestroy() {
    if (this.getEmployeesSub !== undefined) {
      this.getEmployeesSub.unsubscribe();
    }
  }
}

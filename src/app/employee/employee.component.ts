import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeRaw } from '../data/employeeRaw';
import { EmployeeService } from '../data/employee.service';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../data/position.service';
import { Position } from '../data/position';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  private paramSubscription: any;
  private employeeSubscription: any;
  private getPositionsSubscription: any;
  private saveEmployeeSubscription: any;
  private employee: EmployeeRaw = new EmployeeRaw();
  private positions: Position[];
  private successMessage = false;
  private failMessage = false;

  constructor(private employeeService: EmployeeService,
              private activeRoute: ActivatedRoute, private positionService: PositionService) {
  }

  ngOnInit() {
    this.paramSubscription = this.activeRoute.params.subscribe(params => {
      const currentEmployeeId = params.id;
      this.employeeSubscription = this.employeeService.getEmployee(currentEmployeeId).subscribe(employees => {
        // TODO: check
        this.employee = employees.length > 0 ? employees[0] : new EmployeeRaw();
        this.getPositionsSubscription = this.positionService.getPositions().subscribe(positions => {
          this.positions = positions;
        });
      });
    });
  }

  onSubmit() {
    if (this.employee) {
      this.saveEmployeeSubscription = this.employeeService.saveEmployee(this.employee).subscribe(() => {
        this.successMessage = true;
        setTimeout(() => this.successMessage = false, 2500);
      }, () => {
        this.failMessage = true;
        setTimeout(() => this.failMessage = false, 2500);
      });
    }
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }
    if (this.getPositionsSubscription) {
      this.getPositionsSubscription.unsubscribe();
    }
    if (this.saveEmployeeSubscription) {
      this.saveEmployeeSubscription.unsubscribe();
    }
  }
}

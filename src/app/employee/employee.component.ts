import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  response: any;
  constructor(private employeeService: EmployeeServiceService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees(10).subscribe((data) => {
      this.response = data;
    })
  }

}

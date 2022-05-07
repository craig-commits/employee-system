import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  response: any;

  constructor(private activatedRoute: ActivatedRoute, private employeeService: EmployeeServiceService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      console.log(params.get('uuid'))
      this.employeeService.getEmployee(params.get('uuid')!).subscribe((response: any) => {
        this.response = response;
        console.log(this.response)
      })
    })
  }

}

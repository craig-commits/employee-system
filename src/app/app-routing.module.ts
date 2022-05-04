import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  { path: 'employees' , component:EmployeeComponent },
  { path: 'employee/:uuid' , component:EmployeeDetailsComponent },
  { path: '**' , redirectTo: 'employees'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

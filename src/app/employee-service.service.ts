import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './interfaces/employee.interface';
import { Response } from './interfaces/response.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  private api: string = "https://randomuser.me/api";

  constructor(private http: HttpClient) { }

  getEmployees(size: number = 5): Observable<any> {
    return this.http.get<any>(`${this.api}/?results=${size}`).pipe(
      map(response => this.processData(response))
    );
  }

  getEmployee(uuid:number):Observable<any>{
    return this.http.get<any>(`{this.api}/?uuid=${uuid}`).pipe(
      map( response => this.processData(response))
    )
  }

  private processData(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map((emp: any) => (<Employee>{
        uuid: emp.login.uuid,
        firstName: emp.name.first,
        lastName: emp.name.last,
        email: emp.email,
        username: emp.login.username,
        gender: emp.gender,
        address: `${emp.location.street.number} ${emp.location.street.name} ${emp.location.city} ${emp.location.country} `,
        dateOfBirth: emp.dob.date,
        phone: emp.phone,
        imageUrl: emp.picture.large,
        coordinates: {
          latitude: +emp.location.coordinates.latitude,
          longitude: +emp.location.coordinates.longitude
        }
      }))
    };
  }
}

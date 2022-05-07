import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeServiceService } from '../employee-service.service';
import * as Leaflet from 'leaflet';
import { Coordinates } from '../interfaces/coordinate.interface';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  response: any;
  marker = new Leaflet.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconSize: [32, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  constructor(private activatedRoute: ActivatedRoute, private employeeService: EmployeeServiceService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      console.log(params.get('uuid'))
      this.employeeService.getEmployee(params.get('uuid')!).subscribe((response: any) => {
        this.response = response;
        console.log(this.response)
        if(this.response?.results[0]?.coordinates != undefined){
          console.log(this.response?.results[0]?.coordinates)
        this.loadMap(this.response?.results[0]?.coordinates)
        }
      })
    })
    
  }

  private loadMap(coordinate: Coordinates): void {
    console.log("inside map function")
    const map = Leaflet.map('map', {
      center: [coordinate.latitude, coordinate.longitude],
      zoom: 8
    });
    const mainLayer = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      maxZoom:30,
      crossOrigin: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    mainLayer.addTo(map);
    const marker = Leaflet.marker([coordinate.latitude, coordinate.longitude], { icon: this.marker });
    marker.addTo(map).bindPopup(`${this.response.results[0].firstName}'s Location`).openPopup();
  }


}

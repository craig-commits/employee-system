import { Coordinates } from "./coordinate.interface";

export interface Employee{
uuid: string;
firstName:string;
lastName:string;
email:string;
username:string;
gender:string;
address:string;
dateOfBirth: string;
phone: string;
imageUrl : string;
coordinates: Coordinates;
}
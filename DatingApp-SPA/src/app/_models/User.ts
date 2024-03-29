import { Photo } from "./Photo";

export interface User {
    id:string;
    username:string;
    knowAs:string;
    age:number;
    gender:string;
    created:Date;
    lastActive:Date;
    photoUrl:string;
    city:string;
    country:string;
    interests?:string;
    introduction?:string;
    lookingFor?:string;
    photos?:Photo[];

}

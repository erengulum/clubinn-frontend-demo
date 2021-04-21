import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "../../environments/environment";
import { ClubCategoryDto } from '../entity/clubcategory';
import { SubClubDto } from '../entity/subclubdto';


@Injectable({ providedIn: 'root' })
export class SubclubService {
    constructor(private http: HttpClient) { }

    getAllSubclubs() {
        return this.http.get<SubClubDto[]>(`${environment.API_BASE_PATH}/subclubs/all`);
    }

    getAllSubClubsByCategory(categoryId:string){

        return this.http.get<SubClubDto[]>(`${environment.API_BASE_PATH}/subclubs/all/${categoryId}`);

    }

    deleteById(categoryId:string){

        return this.http.delete<any>(`${environment.API_BASE_PATH}/subclubs/delete/${categoryId}`);

    }

    

    saveSubclub(subclub:any){
        console.log("servise geldi:",subclub);
        return this.http.post<any>(`${environment.API_BASE_PATH}/subclubs/create`,subclub);

    }

}
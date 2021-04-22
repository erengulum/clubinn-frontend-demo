import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "../../environments/environment";
import { ClubCategoryDto } from '../entity/clubcategory';


@Injectable({ providedIn: 'root' })
export class ClubCategoryService {
    constructor(private http: HttpClient) { }

    getAllCategories() {
        return this.http.get<ClubCategoryDto[]>(`${environment.API_BASE_PATH}/clubcategories/all`);
    }

    deleteById(categoryId:string){
        console.log("servise geldi:",categoryId);
        return this.http.delete<any>(`${environment.API_BASE_PATH}/clubcategories/delete/${categoryId}`);

    }

    saveClubCategory(clubCategory:ClubCategoryDto){
        console.log("servise geldi:",clubCategory);
        return this.http.post<any>(`${environment.API_BASE_PATH}/clubcategories/create`,clubCategory);

    }


}
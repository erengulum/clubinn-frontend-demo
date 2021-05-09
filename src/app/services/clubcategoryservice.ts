import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "../../environments/environment";
import { ClubCategoryDto } from '../entity/clubcategory';
import { ClubCategoryRequestDto } from '../entity/ClubCategoryRequestDto';


@Injectable({ providedIn: 'root' })
export class ClubCategoryService {
    constructor(private http: HttpClient) { }

    getAllCategories() {
        return this.http.get<ClubCategoryDto[]>(`${environment.API_BASE_PATH}/clubcategories/all`);
    }

    deleteById(categoryId:string){
        return this.http.delete<any>(`${environment.API_BASE_PATH}/clubcategories/delete/${categoryId}`);

    }

    saveClubCategory(clubCategory:ClubCategoryDto){
        return this.http.post<any>(`${environment.API_BASE_PATH}/clubcategories/create`,clubCategory);

    }


    saveClubCategoryRequest(clubCategoryRequestDto:ClubCategoryRequestDto){
        return this.http.post<any>(`${environment.API_BASE_PATH}/clubcategories/request/create`,clubCategoryRequestDto);

    }
    getAllRequests() {
        return this.http.get<ClubCategoryRequestDto[]>(`${environment.API_BASE_PATH}/clubcategories/request/all`);
    }

    deleteRequestById(requestId:string){
        console.log("req silme islemi basladi");
        return this.http.delete<any>(`${environment.API_BASE_PATH}/clubcategories/request/delete/${requestId}`);

    }

    convertRequestToClubCategory(clubCategoryRequestDto:ClubCategoryRequestDto){
        return this.http.post<any>(`${environment.API_BASE_PATH}/clubcategories/request/create/club`,clubCategoryRequestDto);
    }


    voteForClubRequest(requestId:string){
        return this.http.get<any>(`${environment.API_BASE_PATH}/clubcategories/request/vote/${requestId}`);
    }

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "../../environments/environment";
import { ClubCategoryDto } from '../entity/clubcategory';
import { SubClubDto } from '../entity/subclubdto';
import { JoinDto } from '../entity/joinDto';
import { Announcement } from '../entity/announcement';
import { User } from '../entity/user';
import { formDto } from '../entity/formDto';

@Injectable({ providedIn: 'root' })
export class SubclubService {
    constructor(private http: HttpClient) { }

    getAllSubclubs() {
        return this.http.get<SubClubDto[]>(`${environment.API_BASE_PATH}/subclubs/all`);
    }

    getAllSubClubsByCategory(categoryId:string){

        return this.http.get<SubClubDto[]>(`${environment.API_BASE_PATH}/subclubs/all/${categoryId}`);

    }

    getAllNonJoinedSubclubs(){
        return this.http.get<SubClubDto[]>(`${environment.API_BASE_PATH}/subclubs/allnotmember`);

    }

    deleteById(categoryId:string){

        return this.http.delete<any>(`${environment.API_BASE_PATH}/subclubs/delete/${categoryId}`);

    }
    

  
    

    saveSubclub(subclub:any){
        console.log("servise geldi:",subclub);
        return this.http.post<any>(`${environment.API_BASE_PATH}/subclubs/create`,subclub);

    }

    
    joinSubClub(joinDto:JoinDto){
        console.log("join club servise geldi:" + joinDto.username);
        return this.http.post<any>(`${environment.API_BASE_PATH}/subclubs/join`,joinDto);

    }

    getAllJoinedSubclubs(username:string){
        return this.http.get<SubClubDto[]>(`${environment.API_BASE_PATH}/subclubs/getall/${username}`);

    }


    getMembersBySubclubId(subclubId){

        return this.http.get<any>(`${environment.API_BASE_PATH}/subclubs/getmembers/${subclubId}`);
    }
    

    getAllAnnouncements(subclubId){

        return this.http.get<Announcement[]>(`${environment.API_BASE_PATH}/subclubs/announcements/all/${subclubId}`);
    }


    saveAnnouncement(announcementDto, subclubId){
        return this.http.post<any>(`${environment.API_BASE_PATH}/subclubs/announcements/create/${subclubId}`,announcementDto);

    }

    deleteAnnouncementById(anonnId:string){

        return this.http.delete<any>(`${environment.API_BASE_PATH}/subclubs/announcements/delete/${anonnId}`);

    }

    saveFeedback(announcementDto, subclubId,username){
        return this.http.post<any>(`${environment.API_BASE_PATH}/subclubs/feedbacks/create/${subclubId}/${username}`,announcementDto);

    }

    getFeedbacksBySubclubId(subclubId){

        return this.http.get<any>(`${environment.API_BASE_PATH}/subclubs/feedbacks/all/${subclubId}`);
    }

    deleteFeedbackById(feedbackId:string){

        return this.http.delete<any>(`${environment.API_BASE_PATH}/subclubs/feedbacks/delete/${feedbackId}`);

    }

    saveForm(formDto: formDto){
        return this.http.post<any>(`${environment.API_BASE_PATH}/form/create`,formDto);
    }



    assignAdmin(subclubId, userId){
        return this.http.get<any>(`${environment.API_BASE_PATH}/subclubs/${subclubId}/admin/${userId}`);
    }

    getAdmin(subclubId){
        return this.http.get<User>(`${environment.API_BASE_PATH}/subclubs/getadmin/${subclubId}`);
    }

}
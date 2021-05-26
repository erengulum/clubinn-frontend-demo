import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "../../environments/environment";
import { User } from '../entity/user';
import { UserProfile } from '../common/user-profile';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.API_BASE_PATH}/user/all`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.API_BASE_PATH}/user/${id}`);
    }

    getProfile(username:string) {
        return this.http.get<UserProfile>(`${environment.API_BASE_PATH}/user/profile/${username}`);
    }
    getUserData(username:string) {
        return this.http.get<User>(`${environment.API_BASE_PATH}/user/${username}`);
    }

    updateUserData(profile:User, username:string){
        console.log("update profileSettings: ",username);
        return this.http.put<any>(`${environment.API_BASE_PATH}/user/settings/update/${username}`,profile);
    }

    updatePassword(passwordDto, username){ ///profile/changepassword/{username}
        console.log("update profileSettings: ",username);
        return this.http.put<any>(`${environment.API_BASE_PATH}/user/profile/changepassword/${username}`,passwordDto);
    }

    updateUserProfile(profile:UserProfile, username:string){
        console.log("update profile: ",username);
        return this.http.put<any>(`${environment.API_BASE_PATH}/user/profile/update/${username}`,profile);
      }
  

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "../../environments/environment";



@Injectable({ providedIn: 'root' })
export class ChatService {
    constructor(private http: HttpClient) { }

    join() {

        return this.http.get<any>(`${environment.API_BASE_PATH}/chat/18`);

    }


}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "../../environments/environment";
import { Chat } from '../entity/chatdto';
import { MessageDto } from '../entity/messagedto';

@Injectable({ providedIn: 'root' })
export class MessageService{
    constructor(private http: HttpClient) { }

    sendMessage(message: MessageDto){
        return this.http.post<MessageDto>(`${environment.API_BASE_PATH}/chat/send/18`,message);
    }
}
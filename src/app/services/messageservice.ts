import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from "../../environments/environment";
import { Chat } from '../entity/chatdto';
import { MessageHistoryDto } from '../entity/MessageHistoryDto';
import { MessageDto } from '../entity/messagedto';

@Injectable({ providedIn: 'root' })
export class MessageService{
    constructor(private http: HttpClient) { }

    sendMessage(message: MessageDto, subgroupId:number){
        return this.http.post<any>(`${environment.API_BASE_PATH}/chat/sendbysubgroup/${subgroupId}`,message);
    }


    getChatMessages(chatId){

        return this.http.get<MessageHistoryDto[]>(`${environment.API_BASE_PATH}/chat/messages/${chatId}`);

    }

    getChatMessagesBySubclubId(subclubId){

        return this.http.get<MessageHistoryDto[]>(`${environment.API_BASE_PATH}/chat/subclub/messages/${subclubId}`);

    }
  
}
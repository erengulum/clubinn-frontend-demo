import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { environment } from "../../environments/environment";
import { formDto } from "../entity/formDto";


@Injectable({ providedIn: 'root' })
export class QuestionnaireService{
    constructor(private http: HttpClient) { }

    sendclubid(clubids: number[]) {
        return this.http.post<any>(`${environment.API_BASE_PATH}/form/selected`,clubids);
    }

    sendcompletedform(forms: formDto[]){
        return this.http.post<any>(`${environment.API_BASE_PATH}/form/questionnaire`,forms)
    }
}
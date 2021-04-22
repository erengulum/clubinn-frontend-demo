import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubClubDto } from 'src/app/entity/subclubdto';
import { SubclubService } from 'src/app/services/subclubservice';

@Component({
  selector: 'app-subclubsgrid',
  templateUrl: './subclubsgrid.component.html',
  styleUrls: ['./subclubsgrid.component.css']
})
export class SubclubsgridComponent implements OnInit {
  term: string;

  subclubs: SubClubDto[] = [];
  currentCategoryId;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = null;



  constructor(public httpClient: HttpClient, private subclubService:SubclubService, private route: ActivatedRoute) { }


  
  ngOnInit() {
    this.currentCategoryId = this.route.snapshot.paramMap.get('categoryId');
    this.loadSubClubsByCategory();
  }


  public loadSubClubsByCategory() {



    this.subclubService.getAllSubClubsByCategory(this.currentCategoryId).subscribe(
      (data)=>{
        console.log("Service data:", data);
        this.subclubs = data;
      },
      (error)=>{
        console.log("hata var");
      }
    );
}



}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { timeoutWith } from 'rxjs/operators';
import { ClubCategoryDto } from 'src/app/entity/clubcategory';
import { ClubCategoryService } from 'src/app/services/clubcategoryservice';

@Component({
  selector: 'app-clubgroupslisting',
  templateUrl: './clubgroupslisting.component.html',
  styleUrls: ['./clubgroupslisting.component.css']
})
export class ClubgroupslistingComponent implements OnInit {

  term: string;

  
  clubcategories: ClubCategoryDto[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = null;



  constructor(public httpClient: HttpClient, private clubcategoryService:ClubCategoryService) { }


  
  ngOnInit() {
    this.loadData();
  }


  public loadData() {

    this.clubcategoryService.getAllCategories().subscribe(
      (data)=>{
        console.log("Service data:", data);
        this.clubcategories = data;
      },
      (error)=>{
        console.log("hata var");
      }
    );
}







}

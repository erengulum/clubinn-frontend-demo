import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClubCategoryDto } from 'src/app/entity/clubcategory';
import { ClubCategoryService } from 'src/app/services/clubcategoryservice';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ClubCategoryRequestDto } from 'src/app/entity/ClubCategoryRequestDto';

import {first} from 'rxjs/operators';
import { TokenDto } from 'src/app/entity/tokendto';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
declare var $: any;

@Component({
  selector: 'app-clubgroupslisting',
  templateUrl: './clubgroupslisting.component.html',
  styleUrls: ['./clubgroupslisting.component.css']
})
export class ClubgroupslistingComponent implements OnInit {

  term: string;

  requestList:ClubCategoryRequestDto[];
  currentUser: TokenDto;

  loading = false;
  submitted = false;
  error = '';

  clubcategories: ClubCategoryDto[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = null;




  categoryRequestForm: FormGroup;



  constructor(public httpClient: HttpClient, private clubcategoryService:ClubCategoryService,  private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder, private modalService: NgbModal) { 

      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    this.categoryRequestForm = this.formBuilder.group({
      clubCategoryName: ['', Validators.required],
      reason: ['', Validators.required],
      description: ['', Validators.required],
      imageurl: ['', Validators.required]
    });


  }



  ngOnInit() {
    this.loadData();
    this.loadRequestList();
  }


  public loadData() {

    this.clubcategoryService.getAllCategories().subscribe(
      (data) => {
        console.log("Service data:", data);
        this.clubcategories = data;
      },
      (error) => {
        console.log("hata var");
      }
    );
  }


  public loadRequestList() {

    this.clubcategoryService.getAllRequests().subscribe(
      (data) => {
        this.requestList = data;
      },
      (error) => {
      }
    );
  }




  closeResult = '';



  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }




  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  public saveRequest() {
    if (this.categoryRequestForm.invalid) {
      // stop here if it's invalid
      alert('Invalid input');
      return;
    }
    this.clubcategoryService.saveClubCategoryRequest(this.categoryRequestForm.getRawValue())
      .pipe(first())
      .subscribe(
        data => {
          alert(data.responseMessage);
          this.loadRequestList();

        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }


  vote($event: MouseEvent, reqId: string) {
    console.log("tetiklendi");
    ($event.target as HTMLButtonElement).disabled = true;

    this.clubcategoryService.voteForClubRequest(reqId)
      .pipe(first())
      .subscribe(
        data => {
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }






}

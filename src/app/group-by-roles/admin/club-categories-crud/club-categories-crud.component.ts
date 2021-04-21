import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { ClubCategoryDto } from 'src/app/entity/clubcategory';

import {HttpClient} from '@angular/common/http';

import { ClubCategoryService } from 'src/app/services/clubcategoryservice';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
declare var $: any;


@Component({
  selector: 'app-club-categories-crud',
  templateUrl: './club-categories-crud.component.html',
  styleUrls: ['./club-categories-crud.component.css']
})
export class ClubCategoriesCRUDComponent implements OnInit {

  dataSource: ClubCategoryDto[];
  categoryForm: FormGroup;


  constructor(private formBuilder: FormBuilder, public httpClient: HttpClient, 
    private clubcategoryService:ClubCategoryService, private modalService: NgbModal) {
    
    this.categoryForm = this.formBuilder.group({
      clubCategoryName: ['', Validators.required],
      imageurl:['', Validators.required], 
      description: ['', Validators.required],
    });

  }


  
  ngOnInit() {
    this.loadData();
  }




  public loadData() {

    this.clubcategoryService.getAllCategories().subscribe(
      (data)=>{
        console.log("Service data:", data);
        this.dataSource = data;
      },
      (error)=>{
        console.log("hata var");
      }
    );
}


deleteClubCategory(id){
  console.log("silmeye geldi:",id);

  this.clubcategoryService.deleteById(id).subscribe(
    (data)=>{
      this.loadData();

    },
    (error)=>{
      console.log("delete club category hata var");
    }
  );


}







closeResult = '';



open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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





public save(): void {
  if (this.categoryForm.invalid) {
      // stop here if it's invalid
      alert('Invalid input');
      return;
  }
  this.clubcategoryService.saveClubCategory(this.categoryForm.getRawValue())
      .subscribe((): void => {
          alert('Saved!');
          this.loadData();
      });
}








}

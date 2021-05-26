import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }

  backClicked(): void {
    this._location.back();
  }
}

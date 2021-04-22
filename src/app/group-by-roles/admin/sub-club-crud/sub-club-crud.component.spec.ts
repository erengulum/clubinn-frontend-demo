import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubClubCRUDComponent } from './sub-club-crud.component';

describe('SubClubCRUDComponent', () => {
  let component: SubClubCRUDComponent;
  let fixture: ComponentFixture<SubClubCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubClubCRUDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubClubCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

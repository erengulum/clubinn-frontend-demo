import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubCategoriesCRUDComponent } from './club-categories-crud.component';

describe('ClubCategoriesCRUDComponent', () => {
  let component: ClubCategoriesCRUDComponent;
  let fixture: ComponentFixture<ClubCategoriesCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubCategoriesCRUDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubCategoriesCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

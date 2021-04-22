import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubclubsgridComponent } from './subclubsgrid.component';

describe('SubclubsgridComponent', () => {
  let component: SubclubsgridComponent;
  let fixture: ComponentFixture<SubclubsgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubclubsgridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubclubsgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

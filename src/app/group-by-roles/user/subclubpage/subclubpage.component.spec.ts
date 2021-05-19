import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubclubpageComponent } from './subclubpage.component';

describe('SubclubpageComponent', () => {
  let component: SubclubpageComponent;
  let fixture: ComponentFixture<SubclubpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubclubpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubclubpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

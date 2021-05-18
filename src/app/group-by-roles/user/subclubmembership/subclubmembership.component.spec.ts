import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubclubmembershipComponent } from './subclubmembership.component';

describe('SubclubmembershipComponent', () => {
  let component: SubclubmembershipComponent;
  let fixture: ComponentFixture<SubclubmembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubclubmembershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubclubmembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubgroupslistingComponent } from './clubgroupslisting.component';

describe('ClubgroupslistingComponent', () => {
  let component: ClubgroupslistingComponent;
  let fixture: ComponentFixture<ClubgroupslistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubgroupslistingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubgroupslistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

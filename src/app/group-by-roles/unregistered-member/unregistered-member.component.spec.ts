import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredMemberComponent } from './unregistered-member.component';

describe('UnregisteredMemberComponent', () => {
  let component: UnregisteredMemberComponent;
  let fixture: ComponentFixture<UnregisteredMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregisteredMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnregisteredMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

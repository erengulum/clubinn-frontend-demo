import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredLayoutComponent } from './unregistered-layout.component';

describe('UnregisteredLayoutComponent', () => {
  let component: UnregisteredLayoutComponent;
  let fixture: ComponentFixture<UnregisteredLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregisteredLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnregisteredLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

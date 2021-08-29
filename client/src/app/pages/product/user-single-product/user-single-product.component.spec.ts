import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSingleProductComponent } from './user-single-product.component';

describe('UserSingleProductComponent', () => {
  let component: UserSingleProductComponent;
  let fixture: ComponentFixture<UserSingleProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSingleProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSingleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

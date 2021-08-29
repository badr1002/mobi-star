import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForProductsComponent } from './search-for-products.component';

describe('SearchForProductsComponent', () => {
  let component: SearchForProductsComponent;
  let fixture: ComponentFixture<SearchForProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchForProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchForProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

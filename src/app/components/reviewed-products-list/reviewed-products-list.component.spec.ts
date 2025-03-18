import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewedProductsListComponent } from './reviewed-products-list.component';

describe('ReviewedProductsListComponent', () => {
  let component: ReviewedProductsListComponent;
  let fixture: ComponentFixture<ReviewedProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewedProductsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewedProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

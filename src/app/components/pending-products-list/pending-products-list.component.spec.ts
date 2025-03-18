import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingProductsListComponent } from './pending-products-list.component';

describe('PendingProductsListComponent', () => {
  let component: PendingProductsListComponent;
  let fixture: ComponentFixture<PendingProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingProductsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

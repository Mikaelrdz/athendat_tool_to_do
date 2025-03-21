import { Component, inject, signal, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgFor, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { IndexeddbService } from '../../services/indexeddb.service';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product';

@Component({
  selector: 'app-reviewed-products-list',
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    MatIcon,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule,
    MatFormFieldModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './reviewed-products-list.component.html',
  styleUrl: './reviewed-products-list.component.css',
})
export class ReviewedProductsListComponent implements OnInit  {
  private indexedDBService = inject(IndexeddbService);
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  limit = 7;
  lastKey: number| string = 0;
  loading = false;

  products = signal<Product[]>([]);

  constructor() {}

  ngOnInit() {
    this.loadMoreProducts();
  }

  loadMoreProducts() {
    if (this.loading) return;
    this.loading = true;
    this.indexedDBService.getPaginatedProducts('productos', this.lastKey, this.limit)
      .subscribe(newProducts => {
        console.log(newProducts);
        if (newProducts.length > 0) {
          this.products.update(currentProducts => [...currentProducts, ...newProducts]);
          this.lastKey = newProducts[newProducts.length - 1].id;
        }
        this.loading = false;
      });
  }
}

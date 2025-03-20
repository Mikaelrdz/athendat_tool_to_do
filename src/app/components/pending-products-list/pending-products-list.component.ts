import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-pending-products-list',
  imports: [
    MatCardModule,
    NgFor,
    MatButtonModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatIconModule,
  ],
  templateUrl: './pending-products-list.component.html',
  styleUrl: './pending-products-list.component.css',
})
export class PendingProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    console.log('Voy a cargar productos');
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    });
    this.products.forEach((product: Product) => {
      product.status = 'Pendiente';
      this.productService.update(product.id, product);
    });
  }

  deleteProduct(id: string) {
    //DELETE ITEM
  }
}

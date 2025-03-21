import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { IndexeddbService } from '../../services/indexeddb.service';

@Component({
  selector: 'app-pending-products-list',
  imports: [
    MatCardModule,
    NgFor,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDividerModule,
    MatTableModule,
    FormsModule,
    MatPaginator,
    MatTooltipModule,
    NgIf,
  ],
  templateUrl: './pending-products-list.component.html',
  styleUrl: './pending-products-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PendingProductsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private productService = inject(ProductService);
  private indexedDBService = inject(IndexeddbService);
  private dialog = inject(MatDialog);
  startIndex = 0;

  products = signal<Product[]>([]);

  constructor() {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe((data) => {
      this.products.set(
        data.map((product) => ({ ...product, status: 'Pendiente' }))
      );
    });
  }

  openDeleteDialog(product: Product): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id: product.id, name: product.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.deleteProduct(product.id);
      }
    });
  }

  deleteProduct(id: string): void {
    this.productService.delete(id).subscribe(() => {
      this.products.update((products) =>
        products.filter((product) => id !== product.id)
      );
    });
  }

  onPageChange(event: PageEvent) {
    this.startIndex = event.pageIndex;
  }

  saveChanges() {
    this.products().forEach((product) => {
      if (product.status === 'Aprobado' || product.status === 'Desaprobado') {
        this.indexedDBService.addProduct('productos', product).subscribe({
          next: (product) => console.log('Producto agregado con ID:', product.id),
          error: (err) => console.error('Error al agregar producto:', err)
        });
        this.deleteProduct(product.id);
      }
    });
  }

  trackByFn(index: number, item: Product): string {
    return item.id;
  }
}

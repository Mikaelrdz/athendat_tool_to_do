import { Injectable, inject } from '@angular/core';
import { NgxIndexedDBService, DBMode } from 'ngx-indexed-db';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndexeddbService {
  private dbService = inject(NgxIndexedDBService);

  constructor() {}

  addProduct(storeName: string, product: Product) {
    return this.dbService.add(storeName, product);
  }

  getAllProducts(storeName: string) {
    return this.dbService.getAll(storeName);
  }

  deleteProduct(storeName: string, id: number | string) {
    return this.dbService.delete(storeName, id);
  }

  getPaginatedProducts(
    storeName: string,
    lastKey: number | string,
    limit: number
  ): Observable<Product[]> {
    return new Observable((observer) => {
      let products: Product[] = [];
      let count = 0;
      let emitted = false;
  
      const query = IDBKeyRange.lowerBound(lastKey, true);
  
      this.dbService
        .openCursor({
          storeName: storeName,
          query: query,
          direction: 'next',
          mode: DBMode.readonly,
        })
        .subscribe({
          next: (cursor) => {
            if (!cursor || count >= limit) {
              emitted = true;
              observer.next(products);
              observer.complete();
              return;
            }
            products.push(cursor.value);
            count++;
            cursor.continue();
          },
          error: (error) => observer.error(error),
          complete: () => {
            if (!emitted) {
              observer.next(products);
            }
            observer.complete();
          },
        });
    });
  }
  
}

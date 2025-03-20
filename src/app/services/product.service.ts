import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://67db33af1fd9e43fe473e562.mockapi.io/api/v1/';

  constructor(private http: HttpClient) {}

  // Obtener todo
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}product`);
  }

  // Obtener
  getById(id: number | string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}product/${id}`);
  }

  // Crear
  create(data: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}product`, data);
  }

  // Actualizar
  update(id: number | string, data: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}product/${id}`, data);
  }

  // Eliminar
  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}product/${id}`);
  }

}

import { Routes } from '@angular/router';
import { PendingProductsListComponent } from './components/pending-products-list/pending-products-list.component';
import { ReviewedProductsListComponent } from './components/reviewed-products-list/reviewed-products-list.component';

export const routes: Routes = [
  { path: 'pending', component: PendingProductsListComponent },
  { path: 'reviewed', component: ReviewedProductsListComponent },
  { path: '', redirectTo: '/pending', pathMatch: 'full' },
];

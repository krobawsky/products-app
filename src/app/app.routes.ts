import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';

export const routes: Routes = [
  {
    path:'login', 
    component: LoginComponent
  },
  {
    path:'', 
    component: DashboardComponent
  },
  {
    path:'product', 
    component: ProductFormComponent
  },
  {
    path: 'product/:id',
    component: ProductFormComponent
  },
  {
    path:'**', 
    redirectTo: '/'
  }
];
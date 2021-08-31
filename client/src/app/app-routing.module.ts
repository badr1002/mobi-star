import { ComparsionComponent } from './pages/comparsion/comparsion.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { Auth2Guard } from './guards/auth2.guard';
import { SingleCompanyComponent } from './pages/home/companies/single-company/single-company.component';
import { UserSingleProductComponent } from './pages/product/user-single-product/user-single-product.component';
import { ShoppingcartComponent } from './pages/shoppingcart/shoppingcart.component';
import { AllRoutesComponent } from './admin/dashboard/components/routes/all-routes/all-routes.component';
import { SingleProductComponent } from './admin/dashboard/components/products/single-product/single-product.component';
import { AllProductsComponent } from './admin/dashboard/components/products/all-products/all-products.component';
import { AllUsersComponent } from './admin/dashboard/components/users/all-users/all-users.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SetPasswordComponent } from './pages/user/helper/set-password/set-password.component';
import { LoginComponent } from './pages/user/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/user/register/register.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { SearchForProductsComponent } from './pages/search-for-products/search-for-products.component';
import { OrdersComponent } from './admin/dashboard/components/orders/orders.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'company', component: SingleCompanyComponent },
  { path:'compare',component:ComparsionComponent},
  { path: 'search', component: SearchForProductsComponent },
  {
    path: 'product',
    children: [{ path: ':id', component: UserSingleProductComponent }],
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      { path: 'forgetPassword', component: SetPasswordComponent },
      { path: 'shoppingCart', component: ShoppingcartComponent },
    ],
  },
  {
    path: 'dashboard',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'allUsers', component: AllUsersComponent },
      { path: 'allProducts', component: AllProductsComponent },
      { path: 'product', component: SingleProductComponent },
      { path: 'allRoutes', component: AllRoutesComponent },
      { path: 'allOrders', component: OrdersComponent },
    ],
    canActivate: [AdminGuard],
  },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

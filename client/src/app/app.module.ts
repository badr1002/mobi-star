import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './guards/auth.guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { TabsModule, } from 'ngx-bootstrap/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { Error404Component } from './pages/error404/error404.component';
import { UserInterceptor } from './provider/user.interceptor';
import { SetPasswordComponent } from './pages/user/helper/set-password/set-password.component';
import { ActivateUserComponent } from './pages/user/helper/activate-user/activate-user.component';
import { DashNavComponent } from './admin/dashboard/layouts/dash-nav/dash-nav.component';
import { SidebarComponent } from './admin/dashboard/layouts/sidebar/sidebar.component';
import { ReportsComponent } from './admin/dashboard/components/reports/reports.component';
import { GraphsComponent } from './admin/dashboard/components/graphs/graphs.component';
import { ProjectsComponent } from './admin/dashboard/components/projects/projects.component';
import { AllUsersComponent } from './admin/dashboard/components/users/all-users/all-users.component';
import { AllProductsComponent } from './admin/dashboard/components/products/all-products/all-products.component';
import { SingleProductComponent } from './admin/dashboard/components/products/single-product/single-product.component';
import { AddRouteComponent } from './admin/dashboard/components/routes/add-route/add-route.component';
import { AllRoutesComponent } from './admin/dashboard/components/routes/all-routes/all-routes.component';
import { AddProductComponent } from './admin/dashboard/components/products/add-product/add-product.component';
import { SliderComponent } from './pages/home/components/slider/slider.component';
import { CompaniesComponent } from './pages/home/companies/companies.component';
import { LeftSidebarComponent } from './pages/home/components/left-sidebar/left-sidebar.component';
import { CardComponent } from './pages/home/components/card/card.component';
import { ShoppingcartComponent } from './pages/shoppingcart/shoppingcart.component';
import { UserSingleProductComponent } from './pages/product/user-single-product/user-single-product.component';
import { SingleCompanyComponent } from './pages/home/companies/single-company/single-company.component';
import { SearchForProductsComponent } from './pages/search-for-products/search-for-products.component';
import { OrdersComponent } from './admin/dashboard/components/orders/orders.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ComparsionComponent } from './pages/comparsion/comparsion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    Error404Component,
    SetPasswordComponent,
    ActivateUserComponent,
    DashboardComponent,
    DashNavComponent,
    SidebarComponent,
    ReportsComponent,
    GraphsComponent,
    ProjectsComponent,
    AllUsersComponent,
    AllProductsComponent,
    SingleProductComponent,
    AddRouteComponent,
    AllRoutesComponent,
    AddProductComponent,
    SliderComponent,
    CompaniesComponent,
    LeftSidebarComponent,
    CardComponent,
    ShoppingcartComponent,
    UserSingleProductComponent,
    SingleCompanyComponent,
    SearchForProductsComponent,
    OrdersComponent,
    AboutUsComponent,
    ContactComponent,
    ComparsionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { AppRoutingModule } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';

import { BookService } from './services/book.service';

import { FooterComponent } from './components/adminLTE/footer/footer.component';
import { HeaderComponent } from './components/adminLTE/header/header.component';
import { SettingComponent } from './components/adminLTE/setting/setting.component';
import { MenuComponent } from './components/adminLTE/menu/menu.component';

import { Dashboardv1Component } from './components/AdminLTE/page/dashboard/dashboardv1/dashboardv1.component';
import { Dashboardv2Component } from './components/AdminLTE/page/dashboard/dashboardv2/dashboardv2.component';
import { PageNotFoundComponent } from './components/adminLTE/page/page-not-found/page-not-found.component';
import { LoginComponent } from './components/adminLTE/login/login.component';

import { AdminlteRoutingModule } from './components/adminLTE/adminlte-routing.module';
import { BookAddComponent } from './components/books/book.add/book.add.component';
import { BooksDeleteComponent } from './components/books/books-delete/books-delete.component';
import { BooksUpdateComponent } from './components/books/books-update/books-update.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    FooterComponent,
    HeaderComponent,
    SettingComponent,
    MenuComponent,
    Dashboardv1Component,
    Dashboardv2Component,
    PageNotFoundComponent,
    LoginComponent,
    BookAddComponent,
    BooksDeleteComponent,
    BooksUpdateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    AdminlteRoutingModule,
    ReactiveFormsModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }

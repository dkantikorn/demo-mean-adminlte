import { BooksDeleteComponent } from './components/books/books-delete/books-delete.component';
import { BooksUpdateComponent } from './components/books/books-update/books-update.component';
import { BookAddComponent } from './components/books/book.add/book.add.component';
import { BooksComponent } from './components/books/books.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'books',
    component: BooksComponent
  },
  {
    path: 'books-add',
    component: BookAddComponent
  },
  {
    path: 'book-edit',
    component: BooksUpdateComponent

  },
  {
    path: 'book-delete',
    component: BooksDeleteComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

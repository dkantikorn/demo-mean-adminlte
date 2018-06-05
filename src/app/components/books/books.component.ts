import { browser } from 'protractor';
import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  title = "Book Components";
  name: string;
  books;
  constructor(private bookServices: BookService, private router: Router) {

    //this.readAllBook();
  }

  ngOnInit() {
    this.readAllBook();
  }

  /**
   * 
   * Function read all book form the mongo database
   * @author  sarawutt.b
   */
  readAllBook() {
    this.bookServices.readAll().subscribe(
      response => {
        this.books = response.result;
      },
      (err: HttpErrorResponse) => { //Error Handle for case Error

        if (err.error instanceof Error) {
          // Error occurred on client side
          console.log('An error occoured: ', err.error.message);
        } else {
          // Error occourred on server side
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }
    );
  }

  findBook() {
    if (this.name == undefined) {
      this.readAllBook();
    } else {
      this.bookServices.findBook(this.name).subscribe(
        response => {
          console.log(response.result);
          this.books = response.result;
        },
        (err: HttpErrorResponse) => {
          if (err instanceof Error) {
            //Error occured on the client
            console.log('An error occoured: ', err.error.message);
          } else {
            //Error occourred on the server side
            console.log(`Backen returned code ${err.status}, body was: ${err.error}`);
          }
        }

      );
    }

  }


  /**
   * 
   * Function delete fro the book with matching name in parame
   * @author  sarawutt.b
   * @param name as a string of the book
   */
  onDelete(name: string) {
    return this.bookServices.delete(name).subscribe(
      response => {
        console.log(response.response);
        if (response.response == 'OK') {
          this.readAllBook();
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          //Error occurred on the client side
          console.log('An error occurred:', err.error.message);
        } else {
          //Error occerred on the server side
          console.log(`Backend returned code ${err.status}, and body was: ${err.error}`)
        }
      }
    );
  }


  /**
   * 
   * Function redirect to target URI
   * @author  sarawutt.b
   * @param uri 
   */
  redirect(uri: string) {
    this.router.navigate(['/' + uri]);
  }

}

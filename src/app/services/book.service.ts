import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
import { map, filter } from 'rxjs/operators';

interface Book {
  response: string,
  result: [{
    _id: string,
    name: string
  }]
};

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url = 'http://localhost:9000';
  httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/json');
  options = {
    headers: this.httpHeaders
  };
  constructor(private http: HttpClient) {

  }

  /**
   * 
   * Read all book on the database
   * @author sarawutt.b
   */
  readAll() {
    return this.http.get<Book>(this.url + '/api/readAll');
  }


  findBook(name:string){
    return this.http.get<Book>(this.url + '/api/read/' + name);
  }
  /**
   * 
   * Add for new book into the mongo database
   * @author  sarawutt.b
   * @param nameStr string of the book name
   */
  add(nameStr: string) {
    const data = { name: nameStr };
    return this.http.post<Book>(this.url + '/api/insertOne', data);
  }


  /**
   * 
   * Function delete a book where user clicked on the button
   * @author  sarawutt.b
   * @param name as a string of book name
   */
  delete(name: string) {
    return this.http.delete<Book>(this.url + '/api/deleteOne/' + name);
  }
}

import { BookService } from './../../../services/book.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book.add',
  templateUrl: './book.add.component.html',
  styleUrls: ['./book.add.component.css']
})
export class BookAddComponent implements OnInit {

  private name: string;

  constructor(private _bookservice: BookService) { }

  ngOnInit() {
  }

  addBook() {
    console.log(this.name);
    this._bookservice.add(this.name).subscribe(res=>{
      console.log(res);
    });
  }

}

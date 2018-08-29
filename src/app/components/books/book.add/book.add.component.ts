import { BookService } from './../../../services/book.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-book.add',
  templateUrl: './book.add.component.html',
  styleUrls: ['./book.add.component.css']
})
export class BookAddComponent implements OnInit {

  private name: string;

  constructor(private _bookservice: BookService, private router: Router) { }

  ngOnInit() {

  }

  /**
   * 
   * Function add the new item of the books
   * @author  sarawutt.b
   */
  addBook() {
    console.log(this.name);
    this._bookservice.add(this.name).subscribe(res => {
      console.log(res);
      this.router.navigate(['/books']);
    });
  }

}

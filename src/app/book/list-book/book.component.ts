import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Book} from "../../models/book";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookFormGroup!: FormGroup;

  books: Book[] =[];
  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.getBook();
    this.bookFormGroup = new FormGroup({
      id: new FormControl(0,Validators.min(0)),
      title: new FormControl('', Validators.minLength(6)),
      author: new FormControl('', Validators.minLength(6)),
      description: new FormControl(0, Validators.minLength(10)),
    })
  }
  getBook() {
    return this.http.get<Book[]>('http://localhost:3000/books').subscribe((data) => {
      this.books = data;
    })
  }
  deleteBook(id:number){
    this.http.delete(`http://localhost:3000/books/${id}`).subscribe((data)=>{
      alert("Xoá thành công!");
      this.router.navigate(['/book'])
    })
  }
}

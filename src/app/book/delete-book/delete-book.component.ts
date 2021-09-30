import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Book} from "../../models/book";

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {

  bookForm!: FormGroup;
  id!: number;
  constructor(private activatedRoute: ActivatedRoute,
              private http :HttpClient,
              private router :Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = parseInt(<string>paramMap.get('id'));
      this.getBook(this.id);
    }); }

  ngOnInit(): void {
  }
  getBook(id: number) {
    this.http.get<Book>(`http://localhost:3000/books/${id}`).subscribe((data) => {
      this.bookForm = new FormGroup({
        id: new FormControl(data.id),
        title: new FormControl(data.title),
        author: new FormControl(data.author),
        description: new FormControl(data.description),
      });
    })
  }
  deleteBook(id:number){
    this.http.delete(`http://localhost:3000/books/${id}`).subscribe((data)=>{
      alert("Xoá thành công!");
      this.router.navigate(['/book'])
    })
  }

}

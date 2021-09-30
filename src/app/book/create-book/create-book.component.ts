import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Book} from "../../models/book";

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  bookForm!: FormGroup;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.minLength(6)),
      author: new FormControl('', Validators.minLength(6)),
      description: new FormControl(0, Validators.minLength(10)),
    })
  }
  create(){
    this.http.post<Book>(`http://localhost:3000/books`,this.bookForm.value).subscribe((data)=>{
      alert("create thành công!"+data.title);
      this.router.navigate(['/book'])
    })
  }

}

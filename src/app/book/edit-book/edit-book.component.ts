import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Book} from "../../models/book";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookForm!: FormGroup;
  id!: number;
  constructor(private activeRouter: ActivatedRoute,private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      id: new FormControl(),
      title: new FormControl('', Validators.minLength(6)),
      author: new FormControl('', Validators.minLength(6)),
      description: new FormControl(0, Validators.minLength(10)),
    })
    this.activeRouter.params.subscribe((data)=> this.id = data.id);
    this.showEditProduct(this.id);
  }
  edit (id: number){
    this.http.put<Book>(`http://localhost:3000/books/${id}`,this.bookForm.value).subscribe((data)=>{
      alert("edit thành công! "+data.title);
      this.router.navigate(['/book']);
    })
  }

  showEditProduct(id: number){
    this.http.get<Book>(`http://localhost:3000/books/${id}`).subscribe((data)=>{
      this.bookForm.get('id')?.setValue(data.id);
      this.bookForm.get('title')?.setValue(data.title);
      this.bookForm.get('author')?.setValue(data.author);
      this.bookForm.get('description')?.setValue(data.description);

    })
  }

}

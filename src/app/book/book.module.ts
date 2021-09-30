import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DeleteBookComponent
  ],
    imports: [
        CommonModule,
        BookRoutingModule,
        ReactiveFormsModule
    ]
})
export class BookModule { }

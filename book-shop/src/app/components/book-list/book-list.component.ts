import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit{
  ngOnInit(): void {
    this.crudService.getBooks().subscribe(res =>{
console.log(res);
this.Books = res;
    })
  }
  Books: any = []; 
  constructor(private crudService: CrudService){}

}

import { Component } from '@angular/core';
import { Libro } from 'src/app/libros/interfaces/libros.intefaces';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {

  libros: Libro[] = [];
}

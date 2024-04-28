import { Component } from '@angular/core';
import { Libro } from 'src/app/libros/interfaces/libros.intefaces';
import { LibrosService } from 'src/app/libros/services/libros.service';

@Component({
  selector: 'app-main-book',
  templateUrl: './main-book.component.html',
  styleUrls: ['./main-book.component.css']
})
export class MainBookComponent {

  libro: Libro = {} as Libro;
  loading = true;

  constructor( private librosService: LibrosService ) {}

  ngOnInit() {
    this.librosService.getMainBook().subscribe( libro => {
      this.libro! = libro;
      this.loading = false;
    } );
  }
}

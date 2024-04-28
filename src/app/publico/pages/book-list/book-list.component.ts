import { Component } from '@angular/core';
import { Libro } from 'src/app/libros/interfaces/libros.intefaces';
import { LibrosService } from 'src/app/libros/services/libros.service';
import { ModalService } from 'src/app/libros/services/modal.service';
import { SharedService } from 'src/app/libros/services/shared.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {

  libros: Libro[] = [];
  terminoBusqueda: string = '';
  coincidencias: Libro[]= [];
  p: number = 1;
  loading = true;
  
  constructor( private librosService: LibrosService, private sharedService: SharedService,
               private modalService: ModalService ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.loadBooks();
    // this.modalService.notificacion.subscribe((resp) => this.loadBooks());
    this.sharedService.nuevoLibroCreado$.subscribe(() => {
      this.loadBooks();
    });
    
  }

    //cargar libros
    loadBooks() {
      this.librosService.getPublicBooks().subscribe( libros => {
        this.libros = libros;
        this.coincidencias = libros;
        this.loading = false;
      } );
    }

  // filtrar datos
  filterData(): void {
    this.coincidencias = this.libros.filter(libro =>
      libro.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
      libro.autor.toLowerCase().includes(this.terminoBusqueda.toLowerCase())  
    );
  }

}
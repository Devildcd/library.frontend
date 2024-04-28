import { Component } from '@angular/core';
import { Libro } from 'src/app/libros/interfaces/libros.intefaces';
import { LibrosService } from 'src/app/libros/services/libros.service';

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.component.html',
  styleUrls: ['./read-book.component.css']
})
export class ReadBookComponent {

  libro!: Libro;

  constructor( private librosService: LibrosService ) {}

  accessBook() {
    const idDoc: number | undefined = this.libro.documento?.id;
  if (idDoc === undefined) {
    // console.error("El ID del libro es undefined");
    return;
  }
  this.librosService.downloadDoc(idDoc).subscribe(
    resp => {
      const url = window.URL.createObjectURL(resp);
      window.open(url, '_blank');
      window.URL.revokeObjectURL(url);
      // console.log("Documento abierto");
    },
    error => {
      // console.error("Error al descargar el documento:", error);
    }
  );
  }
}

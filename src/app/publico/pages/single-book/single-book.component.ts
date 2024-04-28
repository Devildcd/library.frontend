import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Libro } from 'src/app/libros/interfaces/libros.intefaces';
import { LibrosService } from 'src/app/libros/services/libros.service';
import { ReadBookComponent } from '../../components/read-book/read-book.component';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent {

  libro!: Libro;
  oculto: string = 'oculto';
  loading = true;

  constructor( private librosService: LibrosService, private activeRoute: ActivatedRoute,
               public dialog: MatDialog ) {}

  ngOnInit() {
    window.scrollTo(500, 500);
    this.activeRoute.params.pipe(
      switchMap( ({id}) => this.librosService.getSingleBook( id )  
      ) ).subscribe( libro => {
        this.libro = libro;
        this.loading = false;
        if (this.libro?.id) {
        const idDoc = this.libro.documento?.id;
        }
      } );
      
  }

  downloadBook() {
    const idDoc: number | undefined = this.libro.documento?.id;
    if (idDoc === undefined) {
      console.error("El ID del libro es undefined");
      return;
    }
    this.librosService.downloadDoc(idDoc).subscribe(
      resp => {
        const url = window.URL.createObjectURL(resp);
        const link = document.createElement('a');
        link.href = url;
        link.download = this.libro.nombre;
        link.click();
        window.URL.revokeObjectURL(url);
        // console.log("documento descargado");
      },
      error => {
        // console.error("Error al descargar el documento:", error);
      }
    );
  }

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

  showBook() {
    this.oculto = '';
  }

  closeBook() {
    this.oculto = 'oculto';
  }
 
  openDialog() {
    const dialogRef = this.dialog.open(ReadBookComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

}

  
     
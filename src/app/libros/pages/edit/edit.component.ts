import { Component } from '@angular/core';
import { Libro } from '../../interfaces/libros.intefaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibrosService } from '../../services/libros.service';

import { ActivatedRoute, Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  libro: Libro = {
    nombre: '',
    autor: '',
    codigo: '',
    descripcion: '',
    tipo: ['digital', 'físico', 'externo'],
    descargable: false,
    principal: false,
    ubicacion: '',
    url: '',
  };

  submitted = false;
  imagen = false;
  doc = false;
  tipoCambiado = false;
  loading =  true;

  constructor( private fb: FormBuilder, private librosService: LibrosService, 
               private activeRoute: ActivatedRoute,
               private router: Router,) {}


  ngOnInit(): void {
    this.activeRoute.params.pipe(
      switchMap( ({id}) => this.librosService.getSingleBook( id )  
      ) ).subscribe( libro => {
        this.libro = libro;
        this.loading = false;
        this.formEdit.patchValue({
          nombre: libro.nombre,
          autor: libro.autor,
          codigo: libro.codigo,
          descripcion: libro.descripcion,
          tipo: libro.tipo,
          descargable: libro.descargable,
          principal: libro.principal,
          ubicacion: libro.ubicacion,
          url: libro.url,
        });
      } );
  }             

  

  formEdit: FormGroup = this.fb.group( {
    nombre: ['', Validators.required ],
    autor: ['', Validators.required],
    codigo: ['', Validators.required],
    descripcion: ['', Validators.required],
    tipo: [[], Validators.required],
    descargable: [false],
    principal: [false],
    ubicacion: ['', Validators.maxLength(100)],
    url: '',
  });


  campoValido( campo: string ) {
    return this.formEdit.controls[campo].errors && this.formEdit.controls[campo].touched;
  }

  edit() {
    this.submitted = true;
    if (this.formEdit.invalid) {
      this.formEdit.markAllAsTouched();
      return;
    }
    const id = this.libro?.id;
    if (id === undefined) {
      console.error("El ID del libro es undefined");
      return;
    }
    const libro = this.formEdit.value;
    this.librosService.editBook(id, libro).pipe(
      catchError(error => {
        console.error(error);
        if ( error.error.message === 'El código introducido ya se encuentra en la Base de Datos') {
          Swal.fire({
            icon: 'error',
            title: '¡Revisa bien!',
            text: 'El código ya existe'
          });
        } else if (error.error.message === 'Unauthenticated.') {
          Swal.fire({
            icon: 'error',
            title: '¡Tu sesión ha expirado!',
            text: 'Por favor, vuelve a iniciar sesión',
            showConfirmButton: false,
            timer: 1000 // Duración en milisegundos (1 segundo)
          }).then(() => {
            this.router.navigateByUrl('/autenticación/iniciar-sesión');
          });
        }
        return throwError('Ha ocurrido un error en la API');
      })
    ).subscribe(
      updatedlibro => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Libro actualizado',
          showConfirmButton: false,
          timer: 1000
        });
        setTimeout(() => {
          this.router.navigate(['/manager/libros']);
        }, 1000);
      }
    );
  }

  DeleteImageBook() {

    this.imagen = true;
    const imagenId = this.libro?.imagen?.id; // Verifica si this.libro o this.libro.imagen son undefined antes de acceder a sus propiedades id
    
    if (imagenId === undefined) {
      console.error("El ID de la imagen es undefined");
      return;
    }
    console.log(imagenId);
    
    this.librosService.destroyImage(imagenId).subscribe(
      resp => {
        console.log("Imagen eliminada correctamente");
        this.libro.imagen = undefined;
      },
    );
  }

  DeleteDocBook() {

    this.doc = true;
    const docId = this.libro?.documento?.id; // Verifica si this.libro o this.libro.imagen son undefined antes de acceder a sus propiedades id
    
    if (docId === undefined) {
      console.error("El ID del documento es undefined");
      return;
    }
    console.log(docId);
    
    this.librosService.destroyDoc(docId).subscribe(
      resp => {
        console.log("Docuemnto eliminado correctamente");
        this.libro.documento = undefined;
      },
    );
  }

}

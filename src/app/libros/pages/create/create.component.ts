import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Libro } from '../../interfaces/libros.intefaces';
import { LibrosService } from '../../services/libros.service';
import { Subject, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {

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
 

  constructor(
    private fb: FormBuilder,
    private librosService: LibrosService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  formCreate: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    autor: ['', Validators.required],
    codigo: ['', Validators.required],
    descripcion: ['', Validators.required],
    tipo: [[], Validators.required],
    descargable: [false],
    principal: [false],
    ubicacion: ['', Validators.maxLength(100)],
    url: '',
  });

  campoValido(campo: string) {
    return (
      this.formCreate.controls[campo].errors &&
      this.formCreate.controls[campo].touched
    );
  }

  save() {
    this.submitted = true;
    if (this.formCreate.invalid) {
      this.formCreate.markAllAsTouched();
      return;
    }
    this.libro = this.formCreate.value;
    this.librosService.storeBook(this.libro).pipe(
      catchError(error => {
        // console.log('Error:', error);
        if (error.error.message === 'Unauthenticated.') {
          Swal.fire({
            icon: 'error',
            title: '¡Tu sesión ha expirado!',
            text: 'Por favor, vuelve a iniciar sesión',
            showConfirmButton: false,
            timer: 1000 // Duración en milisegundos (1 segundo)
          }).then(() => {
            this.router.navigateByUrl('/autenticación/iniciar-sesión');
          });
        } else if (error.error.codigo === 'El código ya existe' && error.error.message === 'El código introducido ya se encuentra en la Base de Datos') {
          Swal.fire({
            icon: 'error',
            title: '¡Revisa bien!',
            text: 'El código ya existe'
          });
        }
        return throwError('Ha ocurrido un error en la API');
      })
    ).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Libro creado',
        showConfirmButton: false
      }).then(() => {
        
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    });
  }
  
}

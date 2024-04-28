import { Component } from '@angular/core';
import { Libro } from 'src/app/libros/interfaces/libros.intefaces';
import { LibrosService } from 'src/app/libros/services/libros.service';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {

  libros: Libro[] = [];
  terminoBusqueda: string = '';
  coincidencias: Libro[] = [];
  p: number = 1;
  i: number = 0;
  botonHabilitado = true;
  alert = false;
  alertDoc = false;
  token = localStorage.getItem('token');
  loading = true;

  constructor(
    private librosService: LibrosService,
    private modalService: ModalService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadBooks();

    this.modalService.notificacion.subscribe((resp) => this.loadBooks());

    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const usuarioObj = JSON.parse(usuario);
      this.authService.usuario = {
        user: usuarioObj,
      };
    }
  }

  //cargar libros
  loadBooks() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    this.librosService
      .getLibros(headers)
      .pipe(
        catchError((error) => {
          // console.log('Error:', error);
          if (error.error.message === 'Unauthenticated.') {
            Swal.fire({
              icon: 'error',
              title: '¡Tu sesión ha expirado!',
              text: 'Por favor, vuelve a iniciar sesión',
              showConfirmButton: false,
              timer: 1000, // Duración en milisegundos (1 segundo)
            }).then(() => {
              this.router.navigateByUrl('/autenticación/iniciar-sesión');
            });
          }
          return throwError('Ha ocurrido un error en la API');
        })
      )
      .subscribe((libros) => {
        this.libros = libros;
        this.coincidencias = libros;
        this.loading = false;
      });
  }

  // filtrar datos
  filterData(): void {
    this.coincidencias = this.libros.filter(
      (libro) =>
        libro.nombre
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) ||
        libro.autor.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
    );
  }

  //eliminar libros
  deleteBook(id: number | undefined) {
    if (id !== undefined) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(54, 54, 54)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.librosService.destroyBook(id).subscribe(
            () => {
              // Eliminar el libro de la lista actual sin recargar la página
              const index = this.libros.findIndex((libro) => libro.id === id);
              if (index !== -1) {
                this.libros.splice(index, 1);
              }
              // console.log('Libro eliminado exitosamente');
            },
            (error) => {
              // console.error(error);
              if (error?.error?.message === 'Unauthenticated.') {
                Swal.fire({
                  icon: 'error',
                  title: '¡Tu sesión ha expirado!',
                  text: 'Por favor, vuelve a iniciar sesión',
                  showConfirmButton: false,
                  timer: 1000, // Duración en milisegundos (1 segundo)
                }).then(() => {
                  this.router.navigateByUrl('/autenticación/iniciar-sesión');
                });
              }
            }
          );
        }
      });
    }
  }

  //Modal para carga de imagenes
  //mostrar y ocultar Modal
  mostrarModal(libroId: number) {
    this.modalService.mostrarModal();
    this.modalService.updateSelectedLibroId(libroId);
    this.modalService.exito = false;
    // console.log(this.modalService.selectedLibroId$);
  }

  ocultarModal() {
    this.modalService.ocultarModal();
  }

  showAlert() {
    const alerta = document.getElementById('alerta');
    this.alert = true;
    if (alerta) {
      alerta.style.display = 'block';
    }
  }

  closeAlert() {
    const alerta = document.getElementById('alerta');
    if (alerta) {
      this.alert = false;
    }
  }

  //Modal para carga de documentos
  mostrarModalDoc(libroId: number) {
    this.modalService.mostrarModalDoc();
    this.modalService.updateSelectedLibroId(libroId);
    this.modalService.exitoDoc = false;
  }

  ocultarModalDoc() {
    this.modalService.ocultarModalDoc();
  }

  showAlertDoc() {
    const alertaDoc = document.getElementById('alertaDoc');
    this.alertDoc = true;
    if (alertaDoc) {
      alertaDoc.style.display = 'block';
    }
  }

  closeAlertDoc() {
    const alertaDoc = document.getElementById('alertaDoc');
    if (alertaDoc) {
      this.alertDoc = false;
    }
  }

  deleteDocument(docId: number | undefined) {
    if (docId !== undefined) {
      Swal.fire({
        title: '¡El libro ya contiene un documento!',
        text: '¿Desea eliminarlo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(54, 54, 54)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.librosService.destroyDoc(docId).subscribe(
            () => {
              // Eliminar el documento del libro actual sin recargar la página
              const libroIndex = this.libros.findIndex(
                (libro) => libro.documento?.id === docId
              );
              if (libroIndex !== -1) {
                this.libros[libroIndex].documento = undefined;
              }
              console.log('Documento eliminado exitosamente');
            },
            (error) => {
              // console.error(error);
              if (error?.error?.message === 'Unauthenticated.') {
                Swal.fire({
                  icon: 'error',
                  title: '¡Tu sesión ha expirado!',
                  text: 'Por favor, vuelve a iniciar sesión',
                  showConfirmButton: false,
                  timer: 1000, // Duración en milisegundos (1 segundo)
                }).then(() => {
                  this.router.navigateByUrl('/autenticación/iniciar-sesión');
                });
              }
            }
          );
        }
      });
    }
  }

  deleteImage(imgId: number | undefined) {
    if (imgId !== undefined) {
      Swal.fire({
        title: '¡El libro ya contiene una imagen!',
        text: '¿Desea eliminarla?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(54, 54, 54)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarla',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.librosService.destroyImage(imgId).subscribe(
            () => {
              // Eliminar la imagen del libro actual sin recargar la página
              const libroIndex = this.libros.findIndex(
                (libro) => libro.imagen?.id === imgId
              );
              if (libroIndex !== -1) {
                this.libros[libroIndex].imagen = undefined;
              }
              console.log('Imagen eliminada exitosamente');
            },
            (error) => {
              // console.error(error);
              if (error?.error?.message === 'Unauthenticated.') {
                Swal.fire({
                  icon: 'error',
                  title: '¡Tu sesión ha expirado!',
                  text: 'Por favor, vuelve a iniciar sesión',
                  showConfirmButton: false,
                  timer: 1000, // Duración en milisegundos (1 segundo)
                }).then(() => {
                  this.router.navigateByUrl('/autenticación/iniciar-sesión');
                });
              }
            }
          );
        }
      });
    }
  }

  closeSesion() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/publico/listado-de-libros');
    });
  }
}

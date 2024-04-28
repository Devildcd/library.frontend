import { Component, Inject } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { ModalService } from '../../services/modal.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})

export class AddImageComponent {

  selectedFile: File | null = null;
  libro_id: number| null = null;

  constructor( public modalService: ModalService, 
    private libroService: LibrosService,
    private router: Router,
     ) {}


  ngOnInit() {
    this.modalService.selectedLibroId$.subscribe(libroId => {
      this.libro_id = libroId;
    });
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    // console.log(this.selectedFile)
  }

  previewImage() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (typeof event.target?.result === 'string') {
          this.modalService.previewImg = event.target.result;
        }
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  saveImage() {
    // this.modalService.exito = true;
    this.modalService.errorMensaje = '';
    this.modalService.validFile = '';
    //  console.log(this.libro_id);
    //  console.log(this.selectedFile)
    if (this.selectedFile && this.libro_id) {
      if (this.selectedFile.size > 4 * 1024 * 1024) {
        this.modalService.errorMensaje = 'El tamaño del archivo no puede exceder los 4 MB.';
        
        return;
      }

      //Verificar si el File entrado esta en las extensiones permitidas
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.tiff', '.tif', '.webp', '.ico'];
    const fileExtension = this.selectedFile?.name?.substring(this.selectedFile.name.lastIndexOf('.')).toLowerCase();
    if (fileExtension && !allowedExtensions.includes(fileExtension)) {
      this.modalService.validFile = 'Seleccione un archivo de imagen';
      this.modalService.exito = false;
      return;
    } 

      const formData = new FormData();
      formData.append('imagen', this.selectedFile);
      formData.append('libro_id', this.libro_id.toString());
      // console.log(formData)
      // formData.forEach((value, key) => {
      //   console.log(key, value);
      // });
      this.libroService.uploadImage(formData).subscribe( 
        resp => { 
          // console.log(resp); 
          this.modalService.notificacion.next(resp); 
          Swal.fire({ 
            icon: 'success', 
            title: '¡Éxito!', 
            text: 'Imagen anexada exitosamente', 
            showConfirmButton: false, 
            timer: 1000 
          }); 
        }, 
        error => { 
          // console.error(error); 
          if (error?.error?.message === 'Unauthenticated.') { 
            Swal.fire({ 
              icon: 'error', 
              title: '¡Tu sesión ha expirado!', 
              text: 'Por favor, vuelve a iniciar sesión', 
              showConfirmButton: false, 
              timer: 1000 // Duración en milisegundos (1 segundo) 
            }).then(() => { 
              this.router.navigate(['/auth/login']); 
            }); 
          } 
        } 
      ); 
    } 
    setTimeout(() => {
      this.modalService.ocultarModal();
    }, 1000);
  }
 
}

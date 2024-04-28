import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { LibrosService } from '../../services/libros.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-doc',
  templateUrl: './add-doc.component.html',
  styleUrls: ['./add-doc.component.css']
})
export class AddDocComponent {

  selectedFileDoc: File | null = null;
  libro_id: number| null = null;

  constructor( public modalService: ModalService, private libroService: LibrosService,
    private router: Router) {}

  ngOnInit() {
    this.modalService.selectedLibroId$.subscribe(libroId => {
      this.libro_id = libroId;
      // console.log(this.libro_id);
    });
  }

  onFileSelected(event: any) {
    this.selectedFileDoc = event.target.files[0];
    this.previewImage();
    // console.log(this.selectedFileDoc)
  }


  previewImage() {
    if (this.selectedFileDoc) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (typeof event.target?.result === 'string') {
          this.modalService.previewDoc = event.target.result;
        }
      };
      reader.readAsDataURL(this.selectedFileDoc);
    }
  }

  saveDoc() {
    // this.modalService.exitoDoc = true;
    this.modalService.errorMensajeDoc = '';
    this.modalService.validFileDoc = '';
    if (this.selectedFileDoc && this.libro_id) {
      if (this.selectedFileDoc.size > 2 * 1024 * 1024) {
        this.modalService.errorMensajeDoc = 'El tamaño del archivo no puede exceder los 2 MB.';
        this.modalService.exitoDoc = false;
        return;
      }
      // Verificar si el File entrado está en las extensiones permitidas
      const allowedExtensions = ['.txt', '.pdf', '.doc', '.docx', '.epub', '.mobi', '.rtf', '.swf', '.html', '.azw'];
      const fileExtension = this.selectedFileDoc?.name?.substring(this.selectedFileDoc.name.lastIndexOf('.')).toLowerCase();
      if (fileExtension && !allowedExtensions.includes(fileExtension)) {
        this.modalService.validFileDoc = 'Extensiones de archivo permitidas: .doc, .docx, .pdf, .txt, .rtf, .html, .epub, .mobi, .swf, .azw';
        this.modalService.exitoDoc = false;
        return;
      } 
      const formData = new FormData();
      formData.append('doc', this.selectedFileDoc);
      formData.append('libro_id', this.libro_id.toString());
      // console.log(formData);
      // formData.forEach((value, key) => {
      //   console.log(key, value);
      // });
      this.libroService.uploadDoc(formData).subscribe( 
        resp => { 
          // console.log(resp); 
          this.modalService.notificacion.next(resp); 
          Swal.fire({ 
            icon: 'success', 
            title: '¡Éxito!', 
            text: 'Documento anexado exitosamente', 
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
              this.router.navigate(['/autenticación/iniciar-sesión']); 
            }); 
          } 
        } 
      ); 
    } 
    setTimeout(() => {
      this.modalService.ocultarModalDoc();
    }, 1000);
  }

}

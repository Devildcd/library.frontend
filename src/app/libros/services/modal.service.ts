import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  //variables generales
  private selectedLibroIdSource = new Subject<number | null>();
  selectedLibroId$ = this.selectedLibroIdSource.asObservable();
  notificacion: Subject<any> = new Subject<any>();
  modalVisible: boolean = false;

  //variables para imagen
  oculto: string = 'oculto';
  previewImg: string = '';
  exito = false;
  errorMensaje: string = '';
  validFile: string = '';
  
  //variables para el doc
  ocultoDoc: string = 'ocultoDoc'
  previewDoc: string = '';
  exitoDoc = false;
  errorMensajeDoc:string = '';
  validFileDoc: string = '';

  constructor() {}

  updateSelectedLibroId(libroId: number | null) {
    this.selectedLibroIdSource.next(libroId);
  }

  getSelectedLibroId(): Observable<number | null> {
  return this.selectedLibroIdSource.asObservable();
}
  
//funciones para la imagen
  ocultarModal() {
    this.oculto = 'oculto';
    this.previewImg = '';
  }

  mostrarModal() {
    this.oculto = '';
  }

  //funciones para el doc
  ocultarModalDoc() {
    this.ocultoDoc = 'ocultoDoc';
    this.previewDoc = '';
  }

  mostrarModalDoc() {
    this.ocultoDoc = '';
  }
  
}

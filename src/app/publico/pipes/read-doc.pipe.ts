import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readDoc'
})
export class ReadDocPipe implements PipeTransform {

  transform(nombreDoc: string | undefined): string {
    // const baseUrl = 'http://localhost/ApiBiblioteca/public/storage/';
    const baseUrl = 'http://back.museo26dejulio.cult.cu/storage/';
    const defaultImage = "/assets/img/descarga.png";
    if (nombreDoc) {
      return baseUrl + nombreDoc.replace('public/', '');
    } else {
      return defaultImage;
    }
  }

}

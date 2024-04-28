import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {
  transform(nombreImagen: string | undefined): string {
    // const baseUrl = 'http://localhost/ApiBiblioteca/public/storage/';
    const baseUrl = 'http://back.museo26dejulio.cult.cu/storage/';
    const defaultImage = "/assets/img/descarga.png";
    if (nombreImagen) {
      return baseUrl + nombreImagen.replace('public/', '');
    } else {
      return defaultImage;
    }
  }

}

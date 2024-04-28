import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doc'
})
export class DocPipe implements PipeTransform {
  transform(nombreDoc: string | undefined): any {
    if (nombreDoc) {
      const parts = nombreDoc.split('/');
      return parts[parts.length - 1];
    }
    return '';
  }
}



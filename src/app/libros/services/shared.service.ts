import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  nuevoLibroCreado$: Subject<void> = new Subject<void>();
  libroActualizado$: EventEmitter<number> = new EventEmitter<number>();
}

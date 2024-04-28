import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DocFile, ImagenFile, Libro } from '../interfaces/libros.intefaces';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment.prod';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private baseUrl: string = environment.baseUrl;
  // private baseUrl: string = environment.apiUrl;

  constructor( private http: HttpClient ) {}

  //funciones para la parte publica
  getMainBook(): Observable<Libro> {
    
    return this.http.get<Libro>( this.baseUrl + '/libro-principal' );
  }

  getSingleBook( id: number ): Observable<Libro> {
    return this.http.get<Libro>( this.baseUrl + '/libro/' + id );
  }

  getPublicBooks(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.baseUrl + '/libros-publicos');
  }

  downloadDoc(docFile: number): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', 'application/octet-stream');
    return this.http.get<Blob>(`${this.baseUrl}/download/${docFile}`, {
      headers: headers,
      responseType: 'blob' as 'json'
    });
  }

  accessDoc(docFile: number): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', 'application/octet-stream');
    return this.http.get<Blob>(`${this.baseUrl}/read/${docFile}`, {
      headers: headers,
      responseType: 'blob' as 'json'
    });
  }

  //funciones para la parte administrativa

  getLibros(headers?: HttpHeaders): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.baseUrl + '/libros', { headers });
  }

  storeBook( libro: Libro ): Observable<Libro> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<Libro>( this.baseUrl + '/libro' , libro , { headers });
  }

  uploadImage(data: FormData): Observable<FormData> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.post<FormData>(this.baseUrl + '/imagen', data, { headers });
  }
  
  uploadDoc(data: FormData): Observable<FormData> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.post<FormData>(this.baseUrl + '/doc', data, { headers });
  }
  
  destroyBook(id: number | undefined): Observable<Libro> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.delete<Libro>(this.baseUrl + '/libro/' + id, { headers });
  }
  
  editBook(id: number, libro: Libro): Observable<Libro> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.put<Libro>(this.baseUrl + '/libro/' + id, libro, { headers });
  }
  
  destroyImage(imagenId: number): Observable<ImagenFile> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.delete<ImagenFile>(this.baseUrl + '/imagen/' + imagenId, { headers });
  }
  
  destroyDoc(docId: number): Observable<DocFile> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.delete<DocFile>(this.baseUrl + '/doc/' + docId, { headers });
  }

}

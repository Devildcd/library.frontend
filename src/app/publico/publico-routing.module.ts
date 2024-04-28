import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './pages/book-list/book-list.component';
import { SingleBookComponent } from './pages/single-book/single-book.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'listado-de-libros', component: BookListComponent
      },
      {
        path: 'libro/:id', component: SingleBookComponent
      },
      {
        path: '**', redirectTo: 'listado-de-libros'
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class PublicoRoutingModule { }

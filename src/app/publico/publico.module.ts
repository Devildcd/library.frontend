import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { BookListComponent } from './pages/book-list/book-list.component';
import { SingleBookComponent } from './pages/single-book/single-book.component';
import { MainBookComponent } from './components/main-book/main-book.component';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { StillImageComponent } from './components/still-image/still-image.component';
import { PublicoRoutingModule } from './publico-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ImgPipe } from './pipes/img.pipe';
import { ReadDocPipe } from './pipes/read-doc.pipe';
import { ReadBookComponent } from './components/read-book/read-book.component';




@NgModule({
  declarations: [
    BookListComponent,
    SingleBookComponent,
    MainBookComponent,
    MainComponent,
    StillImageComponent,
    PaginatorComponent,
    ImgPipe,
    ReadDocPipe,
    ReadBookComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    PublicoRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ImgPipe,
    ReadBookComponent
  ]
})
export class PublicoModule { }

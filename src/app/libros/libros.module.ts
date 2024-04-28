import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { HomeComponent } from './pages/home/home.component';
import { LibrosRoutingModule } from './libros-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { AddImageComponent } from './components/add-image/add-image.component';
import { PublicoModule } from '../publico/publico.module';
import { SharedModule } from '../shared/shared.module';
import { AddDocComponent } from './components/add-doc/add-doc.component';
import { DocPipe } from './pipes/doc.pipe';
import { DeleteDocComponent } from './components/delete-doc/delete-doc.component';




@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    HomeComponent,
    AddImageComponent,
    AddDocComponent,
    DocPipe,
    DeleteDocComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    LibrosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PublicoModule,
    SharedModule
  ]
})
export class LibrosModule { }

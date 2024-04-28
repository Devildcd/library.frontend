import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './auth/guards/validar-token.guard';

const routes: Routes = [
  
  // Lazy load
  {
    path: 'biblioteca',
    loadChildren: () => import( './publico/publico.module'). then( m => m.PublicoModule ) 
  },
  {
    path: 'autenticación',
    loadChildren: () => import( './auth/auth.module'). then( m => m.AuthModule ) 
  },
  {
    path: 'manager',
    loadChildren: () => import('./libros/libros.module').then( m => m.LibrosModule),
    canActivate: [ValidarTokenGuard]
  },
  {
    path: '**', redirectTo: 'biblioteca'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

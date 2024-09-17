import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultasListComponent } from './multas/multas-list/multas-list.component';

const routes: Routes = [
  { path: 'multas', component: MultasListComponent },
  { path: '', redirectTo: '/multas', pathMatch: 'full' },
  // outras rotas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

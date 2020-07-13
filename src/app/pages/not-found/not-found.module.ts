import { MatButtonModule } from '@angular/material/button';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';

const MAT_MODULES = [
  MatButtonModule
];

const routes: Routes = [
  {
    path: '', component: NotFoundComponent,
    children: [
      { path: '', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MAT_MODULES
  ]
})
export class NotFoundModule { }

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DeleteDialogComponent } from './delete-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const MAT_MODULES = [
  MatButtonModule,
  FormsModule,
];

@NgModule({
  declarations: [DeleteDialogComponent],
  imports: [
    CommonModule,
    MAT_MODULES
  ]
})
export class DeleteDialogModule { }

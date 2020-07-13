import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningDialogComponent } from './warning-dialog.component';

const MAT_MODULES = [
  MatButtonModule,
  FormsModule,
];

@NgModule({
  declarations: [WarningDialogComponent],
  imports: [
    CommonModule,
    MAT_MODULES
  ]
})
export class WarningDialogModule { }

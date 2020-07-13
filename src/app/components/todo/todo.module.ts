import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TodoComponent } from './todo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';

const MAT_MODULES = [
  MatButtonModule,
  MatFormFieldModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatDialogModule,
  MatCheckboxModule,
];

@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    MAT_MODULES
  ],
  exports: [TodoComponent]
})
export class TodoModule { }

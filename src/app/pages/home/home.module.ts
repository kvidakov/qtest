import { DeleteDialogModule } from './../../components/delete-dialog/delete-dialog.module';
import { FormsModule } from '@angular/forms';
import { TodoComponent } from './../../components/todo/todo.component';
import { TodoModule } from './../../components/todo/todo.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { MatPaginatorModule, MatSortModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  },
];

const MAT_MODULES = [
  MatTableModule,
  MatButtonModule,
  MatDialogModule,
  MatCheckboxModule,
  FormsModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatSelectModule
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TodoModule,
    DeleteDialogModule,
    MAT_MODULES
  ],
  entryComponents: [TodoComponent, DeleteDialogComponent]
})
export class HomeModule { }

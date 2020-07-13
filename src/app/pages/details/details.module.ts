import { WarningDialogComponent } from './../../components/warning-dialog/warning-dialog.component';
import { WarningDialogModule } from './../../components/warning-dialog/warning-dialog.module';
import { DeleteDialogModule } from './../../components/delete-dialog/delete-dialog.module';
import { TodoComponent } from './../../components/todo/todo.component';
import { TodoModule } from './../../components/todo/todo.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';

const routes: Routes = [
  {
    path: ':id', component: DetailsComponent
  }
];


@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TodoModule,
    DeleteDialogModule,
    WarningDialogModule
  ],
  entryComponents: [TodoComponent, DeleteDialogComponent, WarningDialogComponent]
})
export class DetailsModule { }

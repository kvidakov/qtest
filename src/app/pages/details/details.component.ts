import { WarningDialogComponent } from './../../components/warning-dialog/warning-dialog.component';
import { Todo } from './../../interfaces/todo.interface';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatCheckboxChange } from '@angular/material';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  todoId: number | null = null;
  todo: Todo;
  dialogOptions: any = {};
  mode = 'view';

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    private config: ConfigService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.todoId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.dialogOptions = this.config.dialogOptions;
  }

  ngOnInit() {
    if (!isNaN(this.todoId)) {
      this.todo = this.apiService.getTodo(this.todoId);
      if (!this.todo) {
        this.router.navigate(['home']);
      }
    }
  }

  async onGoBack(isDirty) {
    try {
      let canContinue = false;
      if (isDirty) {
        canContinue = await this.openWarningDialog();
        if (canContinue) {
          this.location.back();
        }
      } else {
        this.location.back();
      }
    } catch (error) {
      console.error('An error has been made! Here it is: ', error);
    }
  }

  async onDeleteTodo(todo) {
    try {
      const deleteDialog = this.dialog.open(DeleteDialogComponent, this.dialogOptions);
      deleteDialog.componentInstance.subject = todo.title;

      const data = await deleteDialog.afterClosed().toPromise();
      if (data) {
        await this.apiService.deleteTodo(todo.id);
        this.router.navigate(['home']);
      }
    } catch (error) {
      console.error('Something went wrong!: ', error);
    }
  }

  onCheckboxChanged(event: MatCheckboxChange) {
    this.apiService.toggleTodosCompletedStatus(this.todoId, event.checked);
  }

  onToggleMode(event: string) {
    this.mode = event;
  }

  onUpdateTodo(todo: Todo) {
    this.todo = this.apiService.updateTodo(todo);
  }

  async openWarningDialog(): Promise<boolean> {
    try {
      const options = this.dialogOptions;
      options.disableClose = true;
      const warningDialog = this.dialog.open(WarningDialogComponent, options);

      const data: boolean = !!await warningDialog.afterClosed().toPromise();
      return data;
    } catch (error) {
      console.error('Something went wrong!: ', error);
      return true;
    }
  }
}

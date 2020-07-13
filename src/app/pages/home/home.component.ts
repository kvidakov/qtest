import { TodoComponent } from './../../components/todo/todo.component';
import { Todo } from './../../interfaces/todo.interface';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxChange, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from 'src/app/components/delete-dialog/delete-dialog.component';
import { ConfigService } from 'src/app/services/config.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'title', 'description', 'completed', 'view', 'delete'];
  dataSource: MatTableDataSource<Todo> = new MatTableDataSource<Todo>();
  todos$: Observable<Todo[]>;
  selection = new SelectionModel<Todo>(true, []);
  dialogOptions = {};
  pageSize = 5;
  filterByCompleteStateValues = [
    { name: 'All', value: '' },
    { name: 'Completed', value: true },
    { name: 'Non-completed', value: false }
  ];
  filterByCompleteState = this.filterByCompleteStateValues[0].value;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private config: ConfigService,
    public dialog: MatDialog,
  ) {
    this.todos$ = this.apiService.todos$;
    this.dialogOptions = this.config.dialogOptions;
  }

  ngOnInit() {
    this.todos$.subscribe((data: Todo[]) => {
      if (data.length > 0) {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log('this.dataSource: ', this.dataSource);
        console.log('this.dataSource.paginator: ', this.dataSource.paginator);
      }
    });
    this.dataSource.filterPredicate = (data: Todo, filter: string) =>
      data.title.toLowerCase().includes(filter) || data.description.includes(filter) || data.completed.toString().toLowerCase() === filter;
  }

  async addNewTodo() {
    try {
      const dialogRef = this.dialog.open(TodoComponent, this.dialogOptions);
      dialogRef.componentInstance.mode = 'addNewTodo';
      const data = await dialogRef.afterClosed().toPromise();

      if (data) {
        this.apiService.addNewTodo(data);
      }
    } catch (error) {
      console.error('Something went wrong!: ', error);
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onCheckboxChange(event: MatCheckboxChange, todo: Todo) {
    this.apiService.toggleTodosCompletedStatus(todo.id, event.checked);
  }

  openTodoDetails(todoId: number) {
    this.router.navigate(['details', todoId]);
  }

  async deleteTodo(todo: Todo) {
    try {
      const deleteDialog = this.dialog.open(DeleteDialogComponent, this.dialogOptions);
      deleteDialog.componentInstance.subject = todo.title;

      const data = await deleteDialog.afterClosed().toPromise();
      if (data) {
        this.apiService.deleteTodo(todo.id);
      }

    } catch (error) {
      console.error('Something went wrong!: ', error);
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.toString().trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

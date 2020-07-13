import { Todo } from './../../interfaces/todo.interface';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnChanges {
  @Input() todo: Todo = null;
  @Input() mode = '';
  @Output() addNewTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() goBack: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() checkboxChanged: EventEmitter<MatCheckboxChange> = new EventEmitter<MatCheckboxChange>();
  @Output() toggleMode: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  form: FormGroup = null;
  readonly = true;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TodoComponent>,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.form = this.createForm(this.todo);
    this.readonly = this.mode === 'view' ?  true : false;
  }

  ngOnChanges(changes) {
    if (changes.mode && changes.mode.currentValue === 'edit') {
      this.readonly = false;
      const titleInput = this.el.nativeElement.querySelector('.js-title-input');
      titleInput.focus();
    }
  }

  createForm(todo: Todo): FormGroup {
    if (!todo) {
      return this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        completed: [false, Validators.required],
        created: [new Date(Date.now()), Validators.required],
      });
    }
    return this.formBuilder.group({
      id: [todo.id, Validators.required],
      title: [todo.title, Validators.required],
      description: [todo.description, Validators.required],
      completed: [todo.completed, Validators.required],
      created: [todo.created],
    });
  }

  onSubmit(value: Todo) {
    this.dialogRef.close(value);
  }

  onCheckboxChange(event: MatCheckboxChange) {
    this.checkboxChanged.emit(event);
  }

  emitGoBack() {
    let isDirty = false;
    if (this.mode === 'edit') {
      isDirty = this.form.get('title').dirty || this.form.get('description').dirty || this.form.get('completed').dirty;
    }
    this.goBack.emit(isDirty);
  }

  emitDeleteTodo() {
    this.deleteTodo.emit(this.todo);
  }

  emitToggleMode(type: string) {
    this.toggleMode.emit(type);
  }

  resetValues() {
    this.form.setValue(this.todo);
  }

  saveChanges(value: Todo) {
    this.updateTodo.emit(value);
    this.emitToggleMode('view');
  }
}

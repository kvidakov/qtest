import { Todo } from './../interfaces/todo.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  todos: Todo[] = [...Array(7).keys()].map((iterator, index) => {
    return {
      id: index,
      title: `Title ${index}`,
      description: `todo description #${index}`,
      completed: false, created: new Date(Date.now())
    };
  });
  todos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(this.todos);
  constructor() { }

  addNewTodo(todo: Todo) {
    const data = Object.assign({}, todo, { id: this.todos[this.todos.length - 1].id + 1 });
    this.todos.push(data);
    this.todos$.next(this.todos);
  }

  toggleTodosCompletedStatus(todoId: number, value: boolean) {
    const todoToUpdate = this.todos.find(todo => todo.id === todoId);
    if (todoToUpdate) {
      todoToUpdate.completed = value;
      this.todos$.next(this.todos);
    }
  }

  async deleteTodo(todoId: number) {
    try {
      const todoToDeleteIndex = this.todos.findIndex(todo => todo.id === todoId);
      if (todoToDeleteIndex !== -1) {
        this.todos.splice(todoToDeleteIndex, 1);
        this.todos$.next(this.todos);
      } // here we can add error message logic
      return true;
    } catch (error) {
      console.error('Something went wrong: ', error);
    }
  }

  getTodo(todoId: number): Todo {
    const todo = this.todos.find(t => t.id === todoId);
    return todo;
  }

  updateTodo(todo: Todo) {
    const todoIndex = this.todos.findIndex(t => t.id === todo.id);
    this.todos[todoIndex] = Object.assign({}, this.todos[todoIndex], todo);
    this.todos$.next(this.todos);
    return this.todos[todoIndex];
  }
}

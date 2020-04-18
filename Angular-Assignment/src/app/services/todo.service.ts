import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor() { }
  selectedTodo = new Subject<string>();
  todos: Todo[] = [];
  todosChanged = new Subject<Todo[]>();

  generateId(){
    return '_' + Math.random().toString(36).substr(2, 9)
  }

  addTodo(newTodo: Todo){
    this.todos.push({...newTodo,status:'pending',id: this.generateId()});
    this.todosChanged.next(this.todos.slice());
  }

  deleteTodos(todoId: string[]){
    for(let i=0;i<todoId.length;i++){
      for(let j=0;j<this.todos.length;j++){
        if(todoId[i] === this.todos[j].id ){
          this.todos.splice(j,1);
        }
      }
    }
   
    this.todosChanged.next(this.todos.slice());
  }

  updateTodo(id: string, newTodo: Todo) {
    let index = this.todos.findIndex((value) => value.id == id);
    this.todos[index] = {...newTodo, status:this.todos[index].status, id: this.generateId()};
    this.todosChanged.next(this.todos.slice());
  }

  updateToDoStatus(todoId: string[]){
    for(let i=0;i<todoId.length;i++){
      for(let j=0;j<this.todos.length;j++){
        if(todoId[i] === this.todos[j].id ){
          this.todos[j].status = 'Done';
        }
      }
    }
    this.todosChanged.next(this.todos.slice());
  }

  getTodos(){
    return this.todos.slice();
  }

  getTodoItem(id: string){
    return this.todos.find(x => x.id == id);
  }
}

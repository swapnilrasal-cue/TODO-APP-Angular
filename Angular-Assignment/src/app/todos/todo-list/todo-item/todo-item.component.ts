import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: '[app-todo-item]',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() todoSelected = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  multiTodoSelected(todoId: string){
    this.todoSelected.emit(todoId);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { ProfileComponent } from '../profile/profile.component';
import { TodoListComponent } from '../todos/todo-list/todo-list.component';
import { AddTodoComponent } from '../todos/add-todo/add-todo.component';
import { TodosComponent } from '../todos/todos.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { HomepageComponent } from '../homepage/homepage.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'todos', component: TodosComponent, children: [
      { path: 'add-todo', component: AddTodoComponent },
    ]
  },
  { path: 'home', component: HomepageComponent },

  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

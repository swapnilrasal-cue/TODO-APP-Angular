import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TodoListComponent } from './todos/todo-list/todo-list.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AddTodoComponent } from './todos/add-todo/add-todo.component';
import { TodosComponent } from './todos/todos.component';
import { TodoItemComponent } from './todos/todo-list/todo-item/todo-item.component';
import { StatusPipePipe } from './todos/filters/status-pipe.pipe';
import { CategoriesFilterPipe } from './todos/filters/categories-filter.pipe';
import { DateFilterPipe } from './todos/filters/date-filter.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoadingSpinnerComponent,
    LoginComponent,
    ProfileComponent,
    TodoListComponent,
    AddTodoComponent,
    TodosComponent,
    TodoItemComponent,
    StatusPipePipe,
    CategoriesFilterPipe,
    DateFilterPipe,
    PageNotFoundComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

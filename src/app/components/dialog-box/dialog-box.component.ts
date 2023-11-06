import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoserviceService } from '../todoservice.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  todoData: Todo = {
    completed: '',
    created_date: '', // You might want to initialize these values accordingly
    description: '',
    id: 0,
    title: ''
  };

  title: string = '';
  description: string = '';
  completed: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: Todo, private todoService: TodoserviceService,
    private dialogRef: MatDialogRef<DialogBoxComponent>
  ) {
    if (this.data) {
      // Copy the received data to the editing form
      this.todoData = { ...this.data };
      this.title = this.todoData.title;
      this.description = this.todoData.description;
      this.completed = this.todoData.completed;
    }
  }

  updateToDoFunction() {
    // Update the data from the form to the todoData object
    this.todoData.title = this.title;
    this.todoData.description = this.description;
    this.todoData.completed = this.completed;
    console.log(this.todoData);
    this.todoService.updateToDo(this.todoData).subscribe();
    this.dialogRef.close();
  }

}


export interface Todo {
  completed: string;
  created_date: string;
  description: string;
  id: number;
  title: string;
}

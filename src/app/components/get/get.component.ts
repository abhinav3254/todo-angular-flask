import { Component, OnInit } from '@angular/core';
import { TodoserviceService } from '../todoservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  todos: Todo[] = [];

  constructor(private todoService: TodoserviceService, private router: Router, public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllToDoFunction();
  }

  getAllToDoFunction() {
    this.todoService.getAllTodo().subscribe(
      (res) => {
        this.todos = res as Todo[]
      }
    );
  }

  getAllPending() {
    this.todoService.getAllTodoPending().subscribe(
      (res) => {
        this.todos = res as Todo[]
      }
    );
  }

  getAllCompleted() {
    this.todoService.getAllTodoCompleted().subscribe(
      (res) => {
        this.todos = res as Todo[]
      }
    );
  }

  selectedTodoId: any = null;

  selectTodo(todoId: any) {
    this.selectedTodoId = (this.selectedTodoId === todoId) ? null : todoId;
    console.log(todoId)
  }

  changedRadio(id: number) {
    this.todoService.markAsDone(id).subscribe((res) => {
      console.log(res);
    });
    // window.location.reload();
  }

  // for filter select
  filters = [
    { name: 'completed', selected: false },
    { name: 'pending', selected: false }
  ]

  clickedRadioBootStrap(selectedFilter: any) {
    // If the clicked filter was already selected, unselect it
    if (selectedFilter.selected) {
      selectedFilter.selected = false;
    } else {
      // If the clicked filter was not selected, select it and unselect others
      selectedFilter.selected = true;
      for (const filter of this.filters) {
        if (filter !== selectedFilter) {
          filter.selected = false;
        }
      }
    }

    // Log and display the selected filter
    if (selectedFilter.selected) {
      console.log(`Selected filter: ${selectedFilter.name}`);
      if (selectedFilter.name === 'completed') {
        this.getAllCompleted();
      } else if (selectedFilter.name === 'pending') {
        this.getAllPending();
      }
    } else {
      this.getAllToDoFunction();
    }
  }


  // delete todo
  deleteToDo(id: number) {
    this.todoService.deleteToDo(id).subscribe();
    // window.location.reload();
  }

  // -------------------------- export csv button from here
  // export as csv file
  exportAsCSVFunction() {
    // Sample data in the provided format
    const data = this.todos;

    const csvContent = this.convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'todos.csv');
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  }

  convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).map(this.formatValue).join(','));
    return `${header}\n${rows.join('\n')}`;
  }

  formatValue(val: any): string {
    // Check if the value needs to be wrapped in double quotes (if it contains special characters or spaces)
    if (typeof val === 'string' && (val.includes(',') || val.includes(' '))) {
      return `"${val}"`;
    }
    return val;
  }

  // search function
  searchValue: string = '';
  onInputChange(value: string): void {
    this.searchValue = value;
    if (value === '') {
      this.getAllToDoFunction();
    } else {
      this.searchIt(this.searchValue)
    }
  }

  searchIt(formDataSearch: string) {
    this.todoService.searchToDo(formDataSearch).subscribe(
      (res) => {
        this.todos = res as Todo[];
      }
    );
  }

  // for dialog open
  openDialog() {
    const dialogRef = this.dialog.open(AddComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // for update
  openUpdateDialog(data: Todo) {

    const dialogRef = this.dialog.open(DialogBoxComponent, { data: data });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });

  }

}


export interface Todo {
  completed: boolean
  created_date: string
  description: string
  id: number
  title: string
}


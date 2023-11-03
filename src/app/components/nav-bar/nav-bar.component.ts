import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoserviceService } from '../todoservice.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  todos: Todo[] = [];

  ngOnInit(): void {
    this.getAllToDoFunction();
  }


  constructor(private router: Router, private todoService: TodoserviceService) { }
  gotoAdd() {
    this.router.navigate(['/add']);
  }
  gotoGet() {
    this.router.navigate(['/']);
  }


  getAllToDoFunction() {
    this.todoService.getAllTodo().subscribe(
      (res) => {
        this.todos = res as Todo[]
      }
    );
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


}



export interface Todo {
  completed: boolean
  created_date: string
  description: string
  id: number
  title: string
}


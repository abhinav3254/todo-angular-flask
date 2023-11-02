import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) { }
  gotoAdd() {
    this.router.navigate(['/add']);
  }
  gotoGet() {
    this.router.navigate(['/']);
  }
  title = 'todo-angular';
}

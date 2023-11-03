import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent {

  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar() {
    this._snackBar.openFromComponent(AddComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

}

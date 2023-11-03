import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoserviceService } from '../todoservice.service';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  constructor(private service: TodoserviceService, public snackBar: MatSnackBar) { }

  // upload csv
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.service.uploadCSVFile(file);
    }
  }

  addToDoFunction(form: NgForm) {
    console.log(form.value);
    this.service.addToDo(form.value).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status == 201) {
          console.log('done it');
        } else {
        }
      },
      (error) => {
        if (error.status === 201) {
          this.snackBar.openFromComponent(SnackBarComponent, {
            duration: 1000,
          });
          console.log('done it 2');
        }
      }
    );
  }


}

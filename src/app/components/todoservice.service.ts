import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {

  constructor(private http: HttpClient) { }

  getAllTodo(): Observable<any> {
    const url = 'http://127.0.0.1:5000/';
    return this.http.get(url);
  }

  getAllTodoCompleted(): Observable<any> {
    const url = 'http://127.0.0.1:5000/completed';
    return this.http.get(url);
  }

  getAllTodoPending(): Observable<any> {
    const url = 'http://127.0.0.1:5000/pending';
    return this.http.get(url);
  }

  addToDo(formData: any): Observable<any> {
    const url = 'http://127.0.0.1:5000/add';
    return this.http.post(url, formData);
  }

  markAsDone(id: number): Observable<any> {
    const url = 'http://127.0.0.1:5000/done/' + id;
    return this.http.put(url, {});
  }

  deleteToDo(id: number): Observable<any> {
    const url = 'http://127.0.0.1:5000/deleted/' + id;
    return this.http.delete(url);
  }

  // export csv file
  exportCSVFile(): Observable<any> {
    const url = 'http://127.0.0.1:5000/export-csv';
    return this.http.get(url);
  }

  // upload csv file
  uploadCSVFile(file: File): void {
    const formData = new FormData();
    formData.append('csv_file', file, file.name);

    this.http.post('http://127.0.0.1:5000/upload-csv', formData).subscribe(
      (response) => {
        console.log('CSV file uploaded successfully', response);
        alert('CSV file uploaded successfully :- ' + response);
      },
      (error) => {
        // console.error('Error uploading CSV file', error);
        // alert('Error uploading CSV file :- ' + error);
        if (error.status === 200) {
          alert('CSV file uploaded successfully');
        }
      }
    );
  }

  // search for a todo
  searchToDo(searchText: string): Observable<any> {
    const url = 'http://127.0.0.1:5000/find/' + searchText;
    return this.http.get(url);
  }

}

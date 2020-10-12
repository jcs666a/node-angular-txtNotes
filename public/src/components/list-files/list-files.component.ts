import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";

interface File {
  fileName: string;
  date: string;
  key: string;
}

interface Files {
  files: File
}

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit {
  @Output() edit: EventEmitter<string> = new EventEmitter<string>();

  files$: Observable<object>;
  errorMessage: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getListFiles();
  }

  getListFiles() {
    this.files$ = this.http
    .get<Files>('http://localhost:3001/api/notes')
    .pipe(
      map(data => {
        return data.files;
      }),
      catchError( err => {
        this.errorMessage = err.message;
        throw 'error in source. Details: ' + err.message;
      })
    );
  }

  onEddit(fileName) {
    this.edit.emit(fileName);
  }

  onDelete(fileName) {
    this.files$ = this.http
    .delete(`http://localhost:3001/api/notes/${fileName}`)
    .pipe(
      catchError( err => {
        this.errorMessage = err.message;
        throw 'error in source. Details: ' + err.message;
      })
    );
    this.files$.subscribe((data:any) => {
      this.getListFiles();
    });
  }

}

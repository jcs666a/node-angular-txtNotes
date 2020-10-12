import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";

@Component({
  selector: 'app-form-file',
  templateUrl: './form-file.component.html',
  styleUrls: ['./form-file.component.css']
})
export class FormFileComponent implements OnInit {
  @Input() fileName: string;
  @Output() showList: EventEmitter<string> = new EventEmitter<string>();

  fileData$: Observable<object>;
  title = '';
  content = '';
  errorMsg = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if(this.fileName !== '') {
      this.getFileData();
    }
  }

  getFileData() {
    this.fileData$ = this.http
    .get<any>(`http://localhost:3001/api/notes/${this.fileName}`)
    .pipe(
      map(data => {
        return data.files;
      }),
      catchError( err => {
        this.errorMsg = err.message;
        throw 'error in source. Details: ' + err.message;
      })
    );
    this.fileData$.subscribe((data:any) => {
      this.title = data[0].fileName;
      this.content = data[0].fileContent;
    });
  }

  updateFile() {
    this.fileData$ = this.http
    .put(
      `http://localhost:3001/api/notes/${this.fileName}`,
      {
        title: this.title,
        content: this.content
      }
    )
    .pipe(
      catchError( err => {
        this.errorMsg = err.message;
        throw 'error in source. Details: ' + err.message;
      })
    );
    this.fileData$.subscribe((data:any) => {
      this.showList.emit();
    });
  }

  createFile() {
    this.fileData$ = this.http
    .post(
      `http://localhost:3001/api/notes`,
      {
        title: this.title,
        content: this.content
      }
    )
    .pipe(
      catchError( err => {
        this.errorMsg = err.message;
        throw 'error in source. Details: ' + err.message;
      })
    );
    this.fileData$.subscribe((data:any) => {
      this.showList.emit();
    });
  }

  resetError() {
    this.errorMsg = '';
  }

  onCancel() {
    this.showList.emit();
  }

  onSave() {
    const title = this.title.trim();
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(title == '') {
      this.errorMsg = 'El título no puede estar vacío.';
      this.title = '';
    } else if(re.test(title)) {
      this.errorMsg = 'El título de tu nota no puede ser un correo electrónico.';
    } else {
      this.title = this.title.trim();
      if(this.fileName !== '') {
        this.updateFile();
      } else {
        this.createFile();
      }
    }
  }

}

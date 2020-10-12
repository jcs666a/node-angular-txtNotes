import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output() onEddit: EventEmitter<any> = new EventEmitter();

  title = 'TXT Notes';
  tab = 'list';
  fileName = '';

  goToList() {
    this.fileName = '';
    this.tab = 'list';
  }

  goToAddEdit(file?) {
    this.fileName = file || '';
    this.tab = 'formFile';
  }
}

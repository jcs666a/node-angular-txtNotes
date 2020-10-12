import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms"

import { AppComponent } from './app.component';
import { ListFilesComponent } from '../components/list-files/list-files.component';
import { FormFileComponent } from '../components/form-file/form-file.component';

@NgModule({
  declarations: [
    AppComponent,
    ListFilesComponent,
    FormFileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

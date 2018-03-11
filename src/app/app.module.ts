import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule, RequestOptions, BrowserXhr } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";

import { ToastrModule } from 'ngx-toastr';
import { SortableModule } from "ngx-bootstrap/sortable";

import { Api } from './api';
import { IssuesModule } from "./issues";
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IssuesModule,
    ToastrModule,
    SortableModule.forRoot()
  ],
  providers: [
    Api,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

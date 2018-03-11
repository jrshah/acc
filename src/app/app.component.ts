import { Component, OnInit } from '@angular/core';
import { Api } from './api';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My First Angular App!';
  constructor(
    private api: Api,
  ) {}
  ngOnInit() {
  }
  clearData() {
    localStorage.removeItem('order');
  }
}

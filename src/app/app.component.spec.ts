import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Api } from "./api";

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IssuesModule } from './issues';
import { ToastrModule } from 'ngx-toastr';
import { SortableModule } from 'ngx-bootstrap/sortable';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
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
    }).compileComponents();
  }));

  // created from the boiler plate
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

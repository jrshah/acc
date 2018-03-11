import { TestBed, async } from '@angular/core/testing';
import { IssuesComponent } from './issues.component';
import { Api } from "../api";

import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';


describe('IssuesComponent', () => {
  let title: Title;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IssuesComponent,
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ToastrModule.forRoot()
      ],
      providers: [
        Api,
        Title,
        ToastrService
      ],
    }).compileComponents();
    title = TestBed.get(Title);
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(IssuesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Code Challenge'`, async(() => {
    const currentTitle = title.getTitle();
    expect(currentTitle).toEqual('Code Challenge');
  }));

});

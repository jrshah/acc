import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Api } from './api';

describe('Testing Api', () => {
  let api: Api;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Api]
    });
    api = TestBed.get(Api);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get issues form github', () => {
    const dummyIssue = [
      { id: 1, name: 'abc' },
      { id: 2, name: 'xyz' }
    ];

    const org = 'facebook';
    const repo = 'react';

    api.fetchIssues(org, repo).subscribe((list) => {
      expect(list.length).toBe(2);
      expect(list).toEqual(dummyIssue);
    });

    const requestObj = httpMock.expectOne(`https://api.github.com/repos/${org}/${repo}/issues`);

    expect(requestObj.request.method).toBe('GET');

    requestObj.flush(dummyIssue);

  });

  it('should get no issues form github', () => {
    const org = 'xyz';
    const repo = '9879';

    api.fetchIssues(org, repo).subscribe((list) => {
      expect(list.length).toBe(0);
    });

    const requestObj = httpMock.expectOne(`https://api.github.com/repos/${org}/${repo}/issues`);
    expect(requestObj.request.method).toBe('GET');

  });


});
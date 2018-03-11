import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

@Injectable()
export class Api {
  private issues: Array<any>;
  private githubApiUrl = 'https://api.github.com';
  constructor(
    private http: HttpClient,
  ) { }

  fetchIssues(org: string, repo: string): Observable<Array<any>> {
    const url = `${this.githubApiUrl}/repos/${org}/${repo}/issues`;
    return this.http
      .get<Array<any>>(url)
      .catch((error) => {
        if (error.status === 404) {
          return Observable.of([]);
        }
        return Observable.throw(error.message || error);
      });
  }
}

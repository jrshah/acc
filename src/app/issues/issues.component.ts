import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Title } from "@angular/platform-browser";
import * as moment from 'moment';
import * as _ from 'lodash';
import { Api } from "../api";
import { BehaviorSubject } from "rxjs";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sgmt-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {
  org: string;
  repo: string;
  issues: {};
  order: Array<any>;
  hasSuccessOrg: boolean;
  hasSuccessRepo: boolean;
  constructor(
    private api: Api,
    private title: Title,
    private toastr: ToastrService,
  ) {
    this.title.setTitle('Code Challenge');
    this.order = [];
  }

  ngOnInit() {
    this.hasSuccessOrg = true;
    this.hasSuccessRepo = true;
    const localData = (localStorage.getItem('order')) ? JSON.parse(localStorage.getItem('order')) : null;
    if (localData) {
      this.issues = localData.issues;
      this.order = localData.order;
      const search = localData.id.split("::");
      this.org = search[0];
      this.repo = search[1];
    }
  }

  validText() {
    return (this.repoText() && this.orgText())
  }

  orgText() {
    if (_.trim(this.org) === '') {
      this.hasSuccessOrg = false;
      this.toastr.error('Missing the organisation field.', 'Error');
      return false;
    }
    this.hasSuccessOrg = true;
    return true;
  }

  repoText() {
    if (_.trim(this.repo) === '') {
      this.hasSuccessRepo = false;
      this.toastr.error('Missing the repository field.', 'Error');
      return false;
    }
    this.hasSuccessRepo = true;
    return true;
  }

  dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
  }

  dragOver(event) {
    event.preventDefault();
  }

  allowDrop(event) {
    event.preventDefault();
  }

  drop(event) {
    // the dragged element
    const oldId = event.dataTransfer.getData("text");
    let draggedElement = document.getElementById(oldId);
    // the drop over row
    const newId = event.target.parentNode.id;
    let currentElement = document.getElementById(newId);

    // remove the dragged element
    draggedElement.remove();

    // insert before or after based on the current order
    if( this.order.indexOf(newId) > this.order.indexOf(oldId)) {
      currentElement.parentNode.insertBefore(draggedElement, currentElement.nextSibling);
    } else {
      currentElement.parentNode.insertBefore(draggedElement, currentElement);
    }

    // generate new order
    this.getOrder();
  }

  // converts date string into duration from today string
  durationString(updated_at) {
    const today = moment(new Date());
    const diff = today.diff(moment(updated_at));
    const duration = moment.duration(diff);
    return (duration.asMinutes() < 60)
      ? _.round(duration.asMinutes(), 0) + ' minutes ago'
      : (duration.asHours() < 24)
        ? _.round(duration.asHours(), 0) + ' hours ago'
        : _.round(duration.asDays(), 0) + ' days ago';
  }

  // after drop re-create new order array
  getOrder() {
    const rows = document.getElementById('sortable').children;
    this.order = _.map(rows, (row) => row.id);
    this.storeData();
  }

  storeData() {
    const data = {id: `${this.org}::${this.repo}`, order: this.order, issues: this.issues};
    localStorage.setItem('order', JSON.stringify(data));
  }

  // subscribe to fetch issues service call
  loadIssues() {
    if (!this.validText()) {
      return;
    }
    const currentSearch = `${this.org}::${this.repo}`;
    this.api
      .fetchIssues(this.org, this.repo)
      .subscribe((list) => {
        if (!list || list.length === 0) {
          this.toastr.error(`https://github.com/${this.org}/${this.repo}`, 'Not Found');
          return;
        }
        this.issues = {};
        list.forEach((issue) => {
          issue.created_at = moment(issue.created_at).format('DD/MM/YYYY');
          issue['updated'] = this.durationString(issue.updated_at)
          this.issues[issue.id] = issue;
        });
        const localData = JSON.parse(localStorage.getItem('order'));
        if (localData && localData.id === currentSearch) {
          this.order = localData.value;
        } else {
          this.order = list.map((issue) => issue.id);
          this.storeData();
        }
      });
  }
}
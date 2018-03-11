import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IssuesComponent } from './issues.component';
import { SortableModule } from 'ngx-bootstrap/sortable';

const routes: Routes = [
  { path: '', component: IssuesComponent },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    SortableModule.forRoot(),
  ],
  declarations: [IssuesComponent],
  exports: [IssuesComponent],
})
export class IssuesModule {}

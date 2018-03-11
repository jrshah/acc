import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IssuesComponent } from './issues.component';

const routes: Routes = [
  { path: '', component: IssuesComponent },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [IssuesComponent],
  exports: [IssuesComponent],
})
export class IssuesModule {}

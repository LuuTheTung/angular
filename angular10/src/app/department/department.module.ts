import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentComponent } from './department.component';
import { ShowDepComponent } from './show-dep/show-dep.component';
import { AddEditDepComponent } from './add-edit-dep/add-edit-dep.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import {DepartmentRoutingModule} from './department-routing.module'
@NgModule({
  declarations: [
    DepartmentComponent,
    ShowDepComponent,
    AddEditDepComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DepartmentRoutingModule,
    MaterialModule,
  ]
})
export class DepartmentModule { }

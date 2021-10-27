import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { ShowEmpComponent } from './show-emp/show-emp.component';
import { AddEditEmpComponent } from './add-edit-emp/add-edit-emp.component';
import { DialogEmployeeComponent } from './dialog-employee/dialog-employee.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';


@NgModule({
  declarations: [
    EmployeeComponent,
    ShowEmpComponent,
    AddEditEmpComponent,
    DialogEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class EmployeeModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EmployeeComponent} from './employee/employee.component';
import {DepartmentComponent} from './department/department.component';


const routes: Routes = [
  {
    path:'employee',
    // component:EmployeeComponent
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path:'department',
    // component:DepartmentComponent,
    loadChildren: () => import('./department/department.module').then((m) => m.DepartmentModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

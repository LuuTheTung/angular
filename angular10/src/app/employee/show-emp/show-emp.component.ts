import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { DialogEmployeeComponent } from 'src/app/employee/dialog-employee/dialog-employee.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  EmployeeId:number;
  EmployeeName:string;
  Department:string;
  DateOfJoining:string;
}

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService, public dialog: MatDialog) { }
  displayedColumns: string[] = ['EmployeeId', 'EmployeeName','Department', 'DateOfJoining', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  EmployeeList:any=[];
  DepartmentsList:any=[];
  ModalTitle:string;
  ActivateAddEditEmpComp:boolean=false;
  emp:any;

  ngOnInit(): void {
    this.refreshEmpList();
    this.loadDepartmentList();
  }
  loadDepartmentList(){
    this.service.getAllDepartmentNames().subscribe((data:any)=>{
      this.DepartmentsList=data;      
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addClick(){
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.png"
    }
    this.ModalTitle="Add Employee";
    this.ActivateAddEditEmpComp=true;

  }

  editClick(item){
    this.emp=item;
    this.ModalTitle="Edit Employee";
    this.ActivateAddEditEmpComp=true;
  }

  deleteClick(item){
    if(confirm('Are you sure??')){
      this.service.deleteEmployee(item.EmployeeId).subscribe(data=>{
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }

  closeClick(){
    this.ActivateAddEditEmpComp=false;
    this.refreshEmpList();
  }


  refreshEmpList(){
    this.service.getEmpList().subscribe(data=>{
      this.EmployeeList=data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "600px";
    // dialogConfig.height = "500px";
    dialogConfig.data = {
      title: 'Add employee',
      add:0
  };
  const dialogRef = this.dialog.open(DialogEmployeeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.refreshEmpList();
    });
  }

  openEditDialog(item) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "600px";
    dialogConfig.height = "500px";
    dialogConfig.data = {
      title: 'Edit employee',
      emp:item,
      add:1
  };
  const dialogRef = this.dialog.open(DialogEmployeeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.refreshEmpList();
    });
  }
}


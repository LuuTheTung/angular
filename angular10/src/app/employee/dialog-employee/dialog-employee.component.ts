import { Component, OnInit, Input, Inject } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-dialog-employee',
  templateUrl: './dialog-employee.component.html',
  styleUrls: ['./dialog-employee.component.css']
})
export class DialogEmployeeComponent implements OnInit {
  constructor(private service:SharedService, private dialogRef: MatDialogRef<DialogEmployeeComponent>, @Inject(MAT_DIALOG_DATA) data, private _snackBar: MatSnackBar) {

    this.description = data.title;
    this.emp = data.emp;
    this.add = data.add;
}

  @Input() emp:any;
  add:any;
  description:string;
  EmployeeId:string;
  EmployeeName:string;
  Department:string;
  DateOfJoining:string;
  PhotoFileName:string;
  PhotoFilePath:string;

  DepartmentsList:any=[];

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  loadDepartmentList(){
    this.service.getAllDepartmentNames().subscribe((data:any)=>{
      this.DepartmentsList=data;
    });
    if(this.add == 1){
      this.EmployeeId=this.emp.EmployeeId;
      this.EmployeeName=this.emp.EmployeeName;
      this.Department=this.emp.Department;
      this.DateOfJoining=this.emp.DateOfJoining;
      this.PhotoFileName=this.emp.PhotoFileName;
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
    }
  }

  addEmployee(){
    var val = {
      EmployeeId:this.EmployeeId,
      EmployeeName:this.EmployeeName,
      Department:this.Department,
      DateOfJoining:this.DateOfJoining,
      PhotoFileName:this.PhotoFileName
    };

    this.service.addEmployee(val).subscribe(res=>{
    this._snackBar.open(res.toString(),'',{duration: 5000});
    this.dialogRef.close();
    });
  }

  updateEmployee(){
    var val = {
      EmployeeId:this.EmployeeId,
      EmployeeName:this.EmployeeName,
      Department:this.Department,
      DateOfJoining:this.DateOfJoining,
      PhotoFileName:this.PhotoFileName
    };

    this.service.updateEmployee(val).subscribe(res=>{
    this._snackBar.open(res.toString(),'',{duration: 5000});
    this.dialogRef.close();
    });
  }


  uploadPhoto(event){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
    })
  }

}


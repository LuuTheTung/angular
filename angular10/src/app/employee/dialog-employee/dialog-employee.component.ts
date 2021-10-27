import { Component, OnInit, Input, Inject } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
@Component({
  selector: 'app-dialog-employee',
  templateUrl: './dialog-employee.component.html',
  styleUrls: ['./dialog-employee.component.css']
})
export class DialogEmployeeComponent implements OnInit {
  constructor(
    private service:SharedService, 
    private dialogRef: MatDialogRef<DialogEmployeeComponent>, 
    @Inject(MAT_DIALOG_DATA) data, 
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder) {

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
  submitted = false;
  DepartmentsList:any=[];
  createEmpForm: FormGroup;
  
  ngOnInit(): void {
    this.createEmpForm = this.formBuilder.group({
      nameFormControl: ['', [Validators.required]],
      deptFormControl:['', Validators.required],
      dateFormControl: ['', [Validators.required]],
      photoFormControl:['']
  });
    this.loadDepartmentList();
  }

  loadDepartmentList(){
    this.service.getAllDepartmentNames().subscribe((data:any)=>{
      this.DepartmentsList=data;
    });
    if(this.add == 1){
      this.EmployeeId=this.emp.EmployeeId;
      this.PhotoFileName=this.emp.PhotoFileName;
      this.PhotoFilePath=this.service.PhotoUrl+this.PhotoFileName;
      this.createEmpForm.controls['nameFormControl'].setValue(this.emp.EmployeeName);
      this.createEmpForm.controls['deptFormControl'].setValue(this.emp.Department);
      this.createEmpForm.controls['dateFormControl'].setValue(this.emp.DateOfJoining);
    }    
  }
  
  save(): void {
    this.submitted = true;
    var val = {
      EmployeeId:this.EmployeeId,
      EmployeeName:this.createEmpForm.controls['nameFormControl'].value,
      Department:this.createEmpForm.controls['deptFormControl'].value,
      DateOfJoining:this.createEmpForm.controls['dateFormControl'].value,
      PhotoFileName:this.PhotoFileName
    };
    
    if (!this.validateData()) return;
    if(this.add == 1){
      this.service.updateEmployee(val).subscribe(res=>{
        this._snackBar.open(res.toString(),'',{duration: 5000,panelClass:  ['mat-toolbar', 'mat-primary']});
        this.dialogRef.close();
        });
    }
    else {
      this.service.addEmployee(val).subscribe(res=>{
      this._snackBar.open(res.toString(),'',{duration: 5000,panelClass: ['mat-toolbar', 'mat-primary']});
      this.dialogRef.close();
      });
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

  showErrorRequired(formControlName: string): boolean {
    if (this.createEmpForm.controls[formControlName].errors?.required) {
        return (this.createEmpForm.controls[formControlName].touched || (this.createEmpForm.controls[formControlName].untouched && this.submitted))
            && this.createEmpForm.controls[formControlName].errors.required;
    }
  }
  validateData(): boolean {
    if (this.createEmpForm.invalid) {
        return false;
    }
    return true;
  }
}


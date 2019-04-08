import { Component, OnInit, OnChanges, OnDestroy, AfterContentInit, ViewContainerRef  } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from './../../service/service.service';
import { LoggerService } from './../../logger/logger.service';
import { Http,Headers,Request,Response} from '@angular/http';
import {Toastmessage} from './../../config/toaster.component'
import * as XLSX from 'ts-xlsx';
 
@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})

export class AppProfileComponent implements OnInit{ 
  changepswform:FormGroup;
	constructor(private Form:FormBuilder,private Service:ServiceService,private LoggerService:LoggerService,private Toastmessage:Toastmessage) {
   
  }
  theme='';
  userid:any;
  name:any;
  email:any;
  mobileno:any;
  role:any;
  ngOnInit(){
    this.userid=localStorage.getItem("UserId");
    this.epasscheckuser();
    this.changepswform=this.Form.group({
      createpsw:'',
      confirmpsw:'',
    });
  }



  epasscheckuser(){
    this.Service.epasscheckuser(this.userid)
    .subscribe(data => {
      this.theme=data.Response[0].theme;
      this.name=data.Response[0].name;
      this.email=data.Response[0].email;
      this.mobileno=data.Response[0].mobileno;
      this.role=data.Response[0].role;
      this.changepswform.patchValue({
        createpsw:data.Response[0].password,
        confirmpsw:data.Response[0].password,
      });
    });
  }

  epassforgotpassword(){
    if(this.changepswform.value.createpsw !== ('' && null ) && this.changepswform.value.confirmpsw !== ('' && null ) ){
      if(this.changepswform.value.createpsw === this.changepswform.value.confirmpsw){
        this.Service.epassforgotpassword(this.userid,this.changepswform.value.createpsw).subscribe(data =>{
          if(data.StatusCode === 200){
            this.Toastmessage.showSuccess(data.Message);
            this.epasscheckuser();            
          }else{
            this.Toastmessage.showError(data.Message);
          }
        });
      }else{
        this.changepswform.reset();
        this.Toastmessage.showError('Password does Not match!!!.');
      }
    }else{
      this.Toastmessage.showWarning('Please fill out all values');
    }
  }

}



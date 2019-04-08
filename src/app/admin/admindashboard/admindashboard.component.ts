import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms'
import {ServiceService} from './../../service/service.service'
import {Colors} from './../../config/colors' 
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})

export class AppDashboardComponent implements OnInit{ 
  constructor(private fb:FormBuilder,private Service :ServiceService,private Colors:Colors ,private Routes:Router) { }

  UserId='';
  themecolor:any;
  name:any;
  role:any;
  rights:any;
  ngOnInit(){
    if(localStorage.length > 0){
      this.UserId=localStorage.getItem('UserId');
      this.CheckUser();
    }else{
      this.logout();
    }
  }

  CheckUser(){
    this.Service.epasscheckuser(this.UserId).subscribe( data => {
      if(data.StatusCode === 200){
        this.themecolor=data.Response[0].theme;
        this.name=data.Response[0].name;
        this.role=data.Response[0].role;
        this.rights=data.Response[0].rights.split(',');
        
      }
    });
  }

  testfun(datacome){
    this.Service.epassupdatetheme(this.UserId,datacome).subscribe(data => {
      if(data.StatusCode === 200){
        location.reload();
       // this.CheckUser();
      }else{
        
      }
    });
    
     
  }
  logout(){
    localStorage.clear();
    this.Routes.navigate(['../login']);
  }

}


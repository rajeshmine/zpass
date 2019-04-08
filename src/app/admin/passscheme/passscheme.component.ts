import { Component, OnInit,OnChanges,OnDestroy,AfterContentInit,ViewContainerRef } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms'
import {ServiceService } from './../../service/service.service';
import {LoggerService } from './../../logger/logger.service';
import {Http,Headers,Request,Response} from '@angular/http';
import {AppComponent} from './../../app.component'
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
import {Toastmessage} from './../../config/toaster.component';
import * as XLSX from 'ts-xlsx';
@Component({
  selector: 'app-passscheme',
  templateUrl: './passscheme.component.html',
  styleUrls: ['./passscheme.component.css']
})
export class AppPassschemeComponent implements OnInit {
 
    public addpassschemeform:FormGroup;
    public editpassschemeform:FormGroup;
    constructor(private fb:FormBuilder,private Service :ServiceService,private LoggerService:LoggerService,private AppComponent:AppComponent,private router: Router,private toastr: ToastrService, vcr: ViewContainerRef,private Toastmessage:Toastmessage) {
      
     }
    
     
    // Variable Declaration
     theme='';
    userid:any;
    statelistdropdown=false;
    epassstatelist:any;
    epasscorporationlist:any;
    corporationlistdropdown=false;
    selstatename:any;
    selcorporationcode:any;
    epasscitylist:any;
    citylistdropdown=false;
    allpassschemelist:any;
    role='';
    ngOnInit() {
      this.userid=localStorage.getItem('UserId');
      
      this.addpassschemeform=this.fb.group({
        countrycode:'',
        countryname:'',
        statecode:'',
        statename:'',
        corporationcode:'',
        corporationname:'',
        citycode:'',
        cityname:'',
        
        passschemename:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
      });
      this.editpassschemeform=this.fb.group({
        countrycode:'',
        countryname:'',
        statecode:'',
        statename:'',
        corporationcode:'',
        corporationname:'',
        citycode:'',
        cityname:'',
       
        passschemename:'',
        status:'',
        passschemeno:'',
      });
    
      this.epassstate();
      this.epasscorporation();
      this.epasscity();
      this.allpassscheme();
      this.CheckUser();
    }
    CheckUser(){
      this.Service.epasscheckuser(this.userid).subscribe(data => {  
        this.formvalueset(data.Response[0]);
        this.theme=data.Response[0].theme;

      });
    }
    formvalueset(data){
      this.role=data.role;
      if(data.role === 'SubAdmin' || data.role ==='Admin'){
        this.updatecityfield(data);
      }
    }
    epassstate(){
      this.Service.epassstate().subscribe(data =>{
          this.epassstatelist=data.Response;
      });
    }
    epasscorporation(){
      this.Service.epasscorporation().subscribe(data =>{
        this.epasscorporationlist=data.Response;
      });
    }
    epasscity(){
      this.Service.epasscity().subscribe(data =>{
        this.epasscitylist=data.Response;
      });
    }

    statelistopen(){
      this.statelistdropdown=!this.statelistdropdown;
    }
    corporationlistopen(){
      this.corporationlistdropdown=!this.corporationlistdropdown;
    }

    citylistopen(){
      this.citylistdropdown=!this.citylistdropdown;
    }


    updatestatefield(data){
      this.statelistdropdown=false;
      this.selstatename=data.statename;
      this.addpassschemeform.patchValue({
          countrycode:data.countrycode,
          countryname:data.countryname,
          statecode:data.statecode,
          statename:data.statename,
          corporationcode:'',
          corporationname:'',
          citycode:'',
          cityname:'',
         
          passschemename:'',
          searchstate:'',
          searchcorporation:'',
          searchcity:'',
      });
    }
    updatecorporationfield(data){
      this.corporationlistdropdown=false;
      this.selcorporationcode=data.corporationcode;
      this.addpassschemeform.patchValue({
        countrycode:data.countrycode,
        countryname:data.countryname,
        statecode:data.statecode,
        statename:data.statename,
        corporationcode:data.corporationcode,
        corporationname:data.corporationname,
        citycode:'',
        cityname:'',
      
        passschemename:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
        
     });
    }
   
    updatecityfield(data){
      this.citylistdropdown=false;
     
      this.addpassschemeform.patchValue({
        countrycode:data.countrycode,
        countryname:data.countryname,
        statecode:data.statecode,
        statename:data.statename,
        corporationcode:data.corporationcode,
        corporationname:data.corporationname,
        citycode:data.citycode,
        cityname:data.cityname,
      
        passschemename:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
        
      });
    }

    editformfieldupdate(data){
        this.editpassschemeform.patchValue({
            countrycode:data.countrycode,
            countryname:data.countryname,
            statecode:data.statecode,
            statename:data.statename,
            corporationcode:data.corporationcode,
            corporationname:data.corporationname,
            citycode:data.citycode,
            cityname:data.cityname,
           
            passschemename:data.passschemename,
            status:data.status,
            passschemeno:data.passschemeno,
            
        });
    }

    addpassscheme(){
      if(this.addpassschemeform.value.statename!=''){
        if(this.addpassschemeform.value.corporationname!=''){
          if(this.addpassschemeform.value.cityname!=''){
           
              if(this.addpassschemeform.value.passschemename!=''){
                this.Service.addpassscheme(this.addpassschemeform.value.countrycode,this.addpassschemeform.value.countryname,this.addpassschemeform.value.statecode,this.addpassschemeform.value.statename,this.addpassschemeform.value.corporationcode,this.addpassschemeform.value.corporationname,this.addpassschemeform.value.citycode,this.addpassschemeform.value.cityname,this.addpassschemeform.value.passschemename,this.userid).subscribe(data =>{
                  if(data.StatusCode==200){
                    this.addpassschemeform.reset();
                    this.CheckUser();
                    this.Toastmessage.showSuccess(data.Message);
                    this.allpassscheme();
                  }else{
                    this.Toastmessage.showError(data.Message);
                  }
                });
              }else{
                this.Toastmessage.showInfo('Enter Pass Scheme Name!');
              }
            
          }else{
            this.Toastmessage.showInfo('Choose City Name!');
          }
        }else{
          this.Toastmessage.showInfo('Choose Corporation Code!');
          }
        }else{
          this.Toastmessage.showInfo('Choose State Name!');
          }
      }


    allpassscheme(){
      this.Service.allpassscheme().subscribe(data =>{
        this.allpassschemelist=data.Response;
      });
    }


    editpassscheme(){
      if(this.editpassschemeform.value.statename!='' && this.editpassschemeform.value.corporationcode!='' && this.editpassschemeform.value.cityname!=''){
           
              if(this.editpassschemeform.value.passschemename!=''){
               
                this.Service.editpassscheme(this.editpassschemeform.value.countrycode,this.editpassschemeform.value.countryname,this.editpassschemeform.value.statecode,this.editpassschemeform.value.statename,this.editpassschemeform.value.corporationcode,this.editpassschemeform.value.corporationname,this.editpassschemeform.value.citycode,this.editpassschemeform.value.cityname,this.editpassschemeform.value.passschemename,this.editpassschemeform.value.status,this.editpassschemeform.value.passschemeno).subscribe(data =>{
                  if(data.StatusCode==200){
                    this.editpassschemeform.reset();
                    this.Toastmessage.showSuccess(data.Message);
                    this.allpassscheme();
                  }else{
                    this.Toastmessage.showError(data.Message);
                  }
                });
              }else{
                this.Toastmessage.showInfo('Enter Pass Scheme Name!');
              }
            
          }else{
            this.Toastmessage.showInfo('Click the Table row for fetch the data ,then Edit the Details!');
          }
          
    }





    arrayBuffer:any;
  file:File;
  corporationxlsxdata:any;
  incomingfile(event) 
    {
    this.file= event.target.files[0]; 
    }
  
   Upload() {
    if(this.file != (null && undefined)){

        let fileReader = new FileReader();
          fileReader.onload = (e) => {
              this.arrayBuffer = fileReader.result;
              var data = new Uint8Array(this.arrayBuffer);
              var arr = new Array();
              for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
              var bstr = arr.join("");
              var workbook = XLSX.read(bstr, {type:"binary"});
              var first_sheet_name = workbook.SheetNames[0];
              var worksheet = workbook.Sheets[first_sheet_name];
              this.corporationxlsxdata=XLSX.utils.sheet_to_json(worksheet,{raw:true});
              this.addpassschemexlsx();
          }
          fileReader.readAsArrayBuffer(this.file);
        } else{
          this.Toastmessage.showError('Choose Excel File');
        }  
  }


  addpassschemexlsx(){
      
      var data=this.corporationxlsxdata;
      for(var i=0;i<data.length;i++){
       
        var countrycode=data[i].countrycode;
        var countryname=data[i].countryname;
        var statecode=data[i].statecode;
        var statename=data[i].statename;
        var corporationcode=data[i].corporationcode;
        var corporationname=data[i].corporationname;
        var citycode=data[i].citycode;
        var cityname=data[i].cityname;
     
        var passschemename=data[i].passschemename;
       
        this.Service.addpassscheme(countrycode,countryname,statecode,statename,corporationcode,corporationname,citycode,cityname,passschemename,this.userid).subscribe(data =>{
         
          if(data.StatusCode==200){
            
            this.allpassscheme();
            this.Toastmessage.showSuccess(data.Message);
          }else{
            this.Toastmessage.showError(data.Message);
          }
          
        });


      }

    }







}
      
    
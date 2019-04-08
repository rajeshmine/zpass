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
  selector: 'app-busservice',
  templateUrl: './busservice.component.html',
  styleUrls: ['./busservice.component.css']
})
export class AppBusserviceComponent implements OnInit {
 
    public addbusserviceform:FormGroup;
    public editbusserviceform:FormGroup;
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
    allbusservicelist:any;
    role='';
    ngOnInit() {
      this.userid=localStorage.getItem('UserId');
      
      this.addbusserviceform=this.fb.group({
        countrycode:'',
        countryname:'',
        statecode:'',
        statename:'',
        corporationcode:'',
        corporationname:'',
        citycode:'',
        cityname:'',
        busservicecode:'',
        busservicename:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
      });
      this.editbusserviceform=this.fb.group({
        countrycode:'',
        countryname:'',
        statecode:'',
        statename:'',
        corporationcode:'',
        corporationname:'',
        citycode:'',
        cityname:'',
        busservicecode:'',
        busservicename:'',
        status:'',
        sno:'',
      });
    
      this.epassstate();
      this.epasscorporation();
      this.epasscity();
      this.CheckUser();
      this.allbusservice();
    }

    CheckUser(){
      this.Service.epasscheckuser(this.userid).subscribe(data => {
        this.theme=data.Response[0].theme;   
        this.formvalueset(data.Response[0]);        
      });
    }
    formvalueset(data){
      this.role=data.role;
      if(data.role === 'SubAdmin' || data.role==='Admin'){
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
      this.addbusserviceform.patchValue({
          countrycode:data.countrycode,
          countryname:data.countryname,
          statecode:data.statecode,
          statename:data.statename,
          corporationcode:'',
          corporationname:'',
          citycode:'',
          cityname:'',
          busservicecode:'',
          busservicename:'',
          searchstate:'',
          searchcorporation:'',
          searchcity:'',
      });
    }
    updatecorporationfield(data){
      this.corporationlistdropdown=false;
      this.selcorporationcode=data.corporationcode;
      this.addbusserviceform.patchValue({
        countrycode:data.countrycode,
        countryname:data.countryname,
        statecode:data.statecode,
        statename:data.statename,
        corporationcode:data.corporationcode,
        corporationname:data.corporationname,
        citycode:'',
        cityname:'',
        busservicecode:'',
        busservicename:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
        
     });
    }
   
    updatecityfield(data){
      this.citylistdropdown=false;
     
      this.addbusserviceform.patchValue({
        countrycode:data.countrycode,
        countryname:data.countryname,
        statecode:data.statecode,
        statename:data.statename,
        corporationcode:data.corporationcode,
        corporationname:data.corporationname,
        citycode:data.citycode,
        cityname:data.cityname,
        busservicecode:'',
        busservicename:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
        
      });
    }

    editformfieldupdate(data){
        this.editbusserviceform.patchValue({
            countrycode:data.countrycode,
            countryname:data.countryname,
            statecode:data.statecode,
            statename:data.statename,
            corporationcode:data.corporationcode,
            corporationname:data.corporationname,
            citycode:data.citycode,
            cityname:data.cityname,
            busservicecode:data.busservicecode,
            busservicename:data.busservicename,
            status:data.status,
            sno:data.sno,
            
        });
    }

    addbusservice(){
      if(this.addbusserviceform.value.statename!=''){
        if(this.addbusserviceform.value.corporationname!=''){
          if(this.addbusserviceform.value.cityname!=''){
            if(this.addbusserviceform.value.busservicecode!=''){
              if(this.addbusserviceform.value.busservicename!=''){
                this.Service.addbusservice(this.addbusserviceform.value.countrycode,this.addbusserviceform.value.countryname,this.addbusserviceform.value.statecode,this.addbusserviceform.value.statename,this.addbusserviceform.value.corporationcode,this.addbusserviceform.value.corporationname,this.addbusserviceform.value.citycode,this.addbusserviceform.value.cityname,this.addbusserviceform.value.busservicecode,this.addbusserviceform.value.busservicename,this.userid).subscribe(data =>{
                  if(data.StatusCode==200){
                    this.addbusserviceform.reset();
                    this.CheckUser();
                    this.Toastmessage.showSuccess(data.Message);
                    this.allbusservice();
                  }else{
                    this.Toastmessage.showError(data.Message);
                  }
                });
              }else{
                this.Toastmessage.showInfo('Enter Bus Service Name!');
              }
            }else{
              this.Toastmessage.showInfo('Enter Bus Service Code!');
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


    allbusservice(){
      this.Service.allbusservice().subscribe(data =>{
        this.allbusservicelist=data.Response;
      });
    }


    editbusservice(){
      if(this.editbusserviceform.value.statename!='' && this.editbusserviceform.value.corporationcode!='' && this.editbusserviceform.value.cityname!=''){
            if(this.editbusserviceform.value.busservicecode!=''){
              if(this.editbusserviceform.value.busservicename!=''){
               
                this.Service.editbusservice(this.editbusserviceform.value.countrycode,this.editbusserviceform.value.countryname,this.editbusserviceform.value.statecode,this.editbusserviceform.value.statename,this.editbusserviceform.value.corporationcode,this.editbusserviceform.value.corporationname,this.editbusserviceform.value.citycode,this.editbusserviceform.value.cityname,this.editbusserviceform.value.busservicecode,this.editbusserviceform.value.busservicename,this.editbusserviceform.value.status,this.editbusserviceform.value.sno).subscribe(data =>{
                  if(data.StatusCode==200){
                    this.editbusserviceform.reset();
                    this.Toastmessage.showSuccess(data.Message);
                    this.allbusservice();
                  }else{
                    this.Toastmessage.showError(data.Message);
                  }
                });
              }else{
                this.Toastmessage.showInfo('Enter Bus Service Name!');
              }
            }else{
              this.Toastmessage.showInfo('Enter Bus Service Code!');
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
              this.addbusservicexlsx();
          }
          fileReader.readAsArrayBuffer(this.file);
        } else{
          this.Toastmessage.showError('Choose Excel File');
        } 
  }


  addbusservicexlsx(){
      
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
        var busservicecode=data[i].busservicecode;
        var busservicename=data[i].busservicename;
       
        this.Service.addbusservice(countrycode,countryname,statecode,statename,corporationcode,corporationname,citycode,cityname,busservicecode,busservicename,this.userid).subscribe(data =>{
         
          if(data.StatusCode==200){
            
            this.allbusservice();
            this.Toastmessage.showSuccess(data.Message);
          }else{
            this.Toastmessage.showError(data.Message);
          }
          
        });


      }

    }







}
      
    
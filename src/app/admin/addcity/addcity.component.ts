import { Component, OnInit,OnChanges,OnDestroy,AfterContentInit,ViewContainerRef } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms'
import {ServiceService } from './../../service/service.service';
import {LoggerService } from './../../logger/logger.service';
import {Http,Headers,Request,Response} from '@angular/http';
import {AppComponent} from './../../app.component'
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'ts-xlsx';
@Component({
  selector: 'app-addcity',
  templateUrl: './addcity.component.html',
  styleUrls: ['./addcity.component.css']
})
export class AppAddcityComponent implements OnInit {
 
    public addcityform:FormGroup;
    public editcityform:FormGroup;
    constructor(private fb:FormBuilder,private Service :ServiceService,private LoggerService:LoggerService,private AppComponent:AppComponent,private router: Router,private toastr: ToastrService, vcr: ViewContainerRef) {
      
     }
    
     
    // Variable Declaration
    theme = '';
    epassstatelist:any;
    statelistdropdown=false;
    editstatelistdropdown=false;
    corporationlistdropdown=false;
    citylistdropdown=false;
    userid:any;
    epasscorporationlist:any;
    selstatename:any;
    citylist:any;
    allepasscitylist:any;
    role='';

    ngOnInit() {
      this.userid=localStorage.getItem('UserId');
    
      this.addcityform=this.fb.group({

        countrycode:'',
        countryname:'',
        statecode:'',
        statename:'',
        corporationcode:'',
        corporationname:'',
        citycode:'',
        cityname:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
      });
      this.editcityform=this.fb.group({
        countrycode:'',
        countryname:'',
        statecode:'',
        statename:'',
        corporationcode:'',
        corporationname:'',
        citycode:'',
        cityname:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
        status:'',
        sno:'',
      });

      this.epassstate();
      this.CheckUser();
      this.epasscorporation();
      this.citylistindia();
      this.allepasscity();
    }

   CheckUser(){
      this.Service.epasscheckuser(this.userid).subscribe(data => {
        this.theme=data.Response[0].theme;   
        this.formvalueset(data.Response[0]);         
           
      });
    }
    formvalueset(data){
      this.role=data.role;
      if(data.role === 'Admin'){
       this.updatestatefield(data);
      }
    }
    epassstate(){
      this.Service.epassstate().subscribe(data =>{
          this.epassstatelist=data.Response;
      });
    }

    statelistopen(){
      this.statelistdropdown=!this.statelistdropdown;
    }
    editstatelistopen(){
      this.editstatelistdropdown=!this.editstatelistdropdown;
    }
    corporationlistopen(){
      this.corporationlistdropdown=!this.corporationlistdropdown;
    }
 
    citylistopen(){
      this.citylistdropdown=!this.citylistdropdown;
    }
 
  epasscorporation(){
    this.Service.epasscorporation().subscribe(data =>{
      this.epasscorporationlist=data.Response;
      
    });
  }
  allepasscity(){
    this.Service.allepasscity().subscribe(data =>{
      this.allepasscitylist=data.Response;
      
    });
  }

  citylistindia(){
    this.Service.citylistindia().subscribe(data =>{
      this.citylist=data.Response;
      
    });
  }


  updatestatefield(data){
    this.statelistdropdown=false;
    this.selstatename=data.statename;
    this.addcityform.patchValue({
        countrycode:data.countrycode,
        countryname:data.countryname,
        statecode:data.statecode,
        statename:data.statename,
        corporationcode:'',
        corporationname:'',
        citycode:'',
        cityname:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
    });
  }
  updatecorporationfield(data){
   
    this.corporationlistdropdown=false;
      this.addcityform.patchValue({
        countrycode:data.countrycode,
        countryname:data.countryname,
        statecode:data.statecode,
        statename:data.statename,
        corporationcode:data.corporationcode,
        corporationname:data.corporationname,
        citycode:'',
        cityname:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
     });
  }
  updatecityfield(data){
   
    this.citylistdropdown=false;
    this.addcityform.patchValue({
      citycode:data.id,
      cityname:data.name,
      searchstate:'',
      searchcorporation:'',
      searchcity:'',
   });
  }

  editcitydetailfetch(data){
     this.editcityform.patchValue({
      countrycode:data.countrycode,
      countryname:data.countryname,
      statecode:data.statecode,
      statename:data.statename,
      corporationcode:data.corporationcode,
      corporationname:data.corporationname,
      citycode:data.citycode,
      cityname:data.cityname,
      searchstate:'',
      searchcorporation:'',
      searchcity:'',
      status:data.status,
      sno:data.sno,
   });
  }


  addepasscity(){
    if(this.addcityform.value.statename!=('' && null)){
      if(this.addcityform.value.corporationname!=('' && null)){
        if(this.addcityform.value.cityname!=('' && null)){
          this.Service.addepasscity(this.addcityform.value.countrycode,this.addcityform.value.countryname,this.addcityform.value.statecode,this.addcityform.value.statename,this.addcityform.value.corporationcode,this.addcityform.value.corporationname,this.addcityform.value.citycode,this.addcityform.value.cityname,this.userid).subscribe(data =>{
            if(data.StatusCode==200){
              this.addcityform.reset();
              this.CheckUser();
              this.allepasscity();
              this.showSuccess(data.Message);
            }else{
              this.showWarning(data.Message);
            }
          });
        }else{
          this.showInfo('City Name Empty!');
        }
      }else{
        this.showInfo('Corporation Name Empty!');
      }
    }else{
      this.showInfo('State Name Empty!');
    }
    
  }

  editepasscity(){
    this.Service.editepasscity(this.editcityform.value.status,this.editcityform.value.sno,).subscribe(data =>{
      if(data.StatusCode==200){
        this.editcityform.reset();
        this.showSuccess(data.Message);
        this.allepasscity();
      }else{
        this.showWarning(data.Message);
      }
    });
  }

  showSuccess(Message) {
    this.toastr.success('Success!', Message);
  }
  showWarning(Message) {
    this.toastr.warning('Warning!', Message);
  }
  showInfo(Message){
    this.toastr.info('Info!', Message);
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
              this.addepasscityxlsx();
          }
          fileReader.readAsArrayBuffer(this.file);
        } else{
          this.showWarning('Choose Excel File');
        }  
  }


  addepasscityxlsx(){
     
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
       
        this.Service.addepasscity(countrycode,countryname,statecode,statename,corporationcode,corporationname,citycode,cityname,this.userid).subscribe(data =>{
         
          if(data.StatusCode==200){
            
            this.epasscorporation();
            this.showSuccess(data.Message);
          }else{
            this.showWarning(data.Message);
          }
          
        });


      }

    }

 




}

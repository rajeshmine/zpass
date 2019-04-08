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
  selector: 'app-addcorporation',
  templateUrl: './addcorporation.component.html',
  styleUrls: ['./addcorporation.component.css']
})
export class AppAddcorporationComponent implements OnInit {
 
    public addcorporationform:FormGroup;
    public editcorporationform:FormGroup;
    constructor(private fb:FormBuilder,private Service :ServiceService,private LoggerService:LoggerService,private AppComponent:AppComponent,private router: Router,private toastr: ToastrService, vcr: ViewContainerRef) { }
    
     
    // Variable Declaration
    theme = '';
    epassstatelist:any;
    statelistdropdown=false;
    editstatelistdropdown=false;
    userid:any;
    allepasscorporationlist:any;
    role='';
    ngOnInit() {
      this.userid=localStorage.getItem('UserId');
    
      this.addcorporationform=this.fb.group({
        statename:'',
        corporationcode:'',
        corporationname:'',
        countrycode:'',
        countryname:'',
        statecode:'',
        updateby:'',
        searchstate:''
      });
      this.editcorporationform=this.fb.group({
        statename:'',
        corporationcode:'',
        corporationname:'',
        countrycode:'',
        countryname:'',
        statecode:'',
        sno:'',
        status:''
      });

      this.epassstate();
      this.CheckUser();
      this.allepasscorporation();
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

    updatestatefield(data){
      
      this.addcorporationform.patchValue({
        statename:data.statename,
        countrycode:data.countrycode || 'IN',
        countryname:data.countryname || 'India',
        statecode:data.statecode,
        searchstate:''
    });
    this.statelistdropdown=false;
    }

    
    updateeditstatefield(data){
        
      this.editcorporationform.patchValue({
        statename:data.statename,
        countrycode:data.countrycode,
        countryname:data.countryname,
        statecode:data.statecode,
        
    });
  this.editstatelistdropdown=false;
  }
  editcorporationdetailfetch(data){
   
      this.editcorporationform.patchValue({
        statename:data.statename,
        countrycode:data.countrycode,
        countryname:data.countryname,
        statecode:data.statecode,
        sno:data.sno,
        corporationcode:data.corporationcode,
        corporationname:data.corporationname,
        status:data.status,
      });
  }

  addepasscorporation(){
    if(this.addcorporationform.value.statename!=''){
      if(this.addcorporationform.value.corporationname!=''){
        this.Service.addepasscorporation(this.addcorporationform.value.countrycode,this.addcorporationform.value.countryname,this.addcorporationform.value.statecode,this.addcorporationform.value.statename,this.addcorporationform.value.corporationcode,this.addcorporationform.value.corporationname,this.userid).subscribe(data =>{
         
          if(data.StatusCode==200){
            this.addcorporationform.reset();
            this.CheckUser();
            this.allepasscorporation();
            this.showSuccess(data.Message);
          }else{
            this.showWarning(data.Message);
          }
          
        });
      }else{
        this.showInfo('Corporation Name Empty!');
      }
    }else{
      this.showInfo('State Name Empty!');
    }
   
  }

  editepasscorporation(){
    if(this.editcorporationform.value.statename!=''){
      if(this.editcorporationform.value.corporationname!=''){
        if(this.editcorporationform.value.status!=''){
          this.Service.editepasscorporation(this.editcorporationform.value.countrycode,this.editcorporationform.value.countryname,this.editcorporationform.value.statecode,this.editcorporationform.value.statename,this.editcorporationform.value.corporationcode,this.editcorporationform.value.corporationname,this.editcorporationform.value.status,this.editcorporationform.value.sno).subscribe(data =>{
            if(data.StatusCode==200){
              this.editcorporationform.reset();
              this.allepasscorporation();
              this.showSuccess(data.Message);
            }else{
              this.showWarning(data.Message);
            }
           
          });
        }else{
          this.showInfo('Status Empty!');
        }
      }else{
        this.showInfo('Corporation Name Empty!');
      }
    }else{
      this.showInfo('State Name Empty!');
    }
   
  }

  allepasscorporation(){
    this.Service.allepasscorporation().subscribe(data =>{
      this.allepasscorporationlist=data.Response;
      
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
              this.addepasscorporationxlsx();
          }
          fileReader.readAsArrayBuffer(this.file);
        } else{
          this.showWarning('Choose Excel File');
        }
  }


    addepasscorporationxlsx(){
    
      var data=this.corporationxlsxdata;
      for(var i=0;i<data.length;i++){
       
        var countrycode=data[i].countrycode;
        var countryname=data[i].countryname;
        var statecode=data[i].statecode;
        var statename=data[i].statename;
        var corporationcode=data[i].corporationcode;
        var corporationname=data[i].corporationname;
        
        this.Service.addepasscorporation(countrycode,countryname,statecode,statename,corporationcode,corporationname,this.userid).subscribe(data =>{
        
          if(data.StatusCode==200){
            this.addcorporationform.reset();
            this.allepasscorporation();
            this.showSuccess(data.Message);
          }else{
            this.showWarning(data.Message);
          }
          
        });


      }

    }

 




}

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
  selector: 'app-fairdetailslocation',
  templateUrl: './fairdetailslocation.component.html',
  styleUrls: ['./fairdetailslocation.component.css']
})
export class AppFairdetailslocationComponent implements OnInit {
 
    public addfairdetailslocationform:FormGroup;
    public editfairdetailslocationform:FormGroup;
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
    passschemelist:any;
    passschemelistdropdown=false;
    selcitycode:any;
    passtypelist:any;
    passtypelistdropdown=false;
    selpassschemeno:any;
    allfairdetailslocationlist:any;
    epassarealist:any;
    tolocationlistdropdown=false;
    fromlocationlistdropdown=false;
    role='';
    ngOnInit() {
      this.userid=localStorage.getItem('UserId');
      
      this.addfairdetailslocationform=this.fb.group({
        countrycode:'',
        countryname:'',
        statecode:'',
        statename:'',
        corporationcode:'',
        corporationname:'',
        citycode:'',
        cityname:'',
        passschemeno:'',
        passschemename:'',
        passtypeno:'',
        passtypename:'',
        restriction:'',
        duration:'',
        allovercity:'',
        fromlocation:'',
        tolocation:'',
        amount:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
        searchpassscheme:'',
        
      });
      this.editfairdetailslocationform=this.fb.group({
        countrycode:'',
        countryname:'',
        statecode:'',
        statename:'',
        corporationcode:'',
        corporationname:'',
        citycode:'',
        cityname:'',
        passschemeno:'',
        passschemename:'',
        passtypeno:'',
        passtypename:'',
        restriction:'',
        duration:'',
        allovercity:'',
        fromlocation:'',
        tolocation:'',
        amount:'',
        status:'',
        sno:'',
      });
    
      this.epassstate();
      this.epasscorporation();
      this.epasscity();
      this.passscheme();
      this.passtype();
      this.allfairdetailslocation();
      this.epassarea();
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
    passscheme(){
      this.Service.passscheme().subscribe(data =>{
        this.passschemelist=data.Response;
        
      });
    }
    passtype(){
      this.Service.passtype().subscribe(data =>{
          this.passtypelist=data.Response;
      });
    }
   
    allfairdetailslocation(){
     
      this.Service.allfairdetailslocation().subscribe(data =>{
        
          this.allfairdetailslocationlist=data.Response;
      });
    }

    epassarea(){
      this.Service.epassarea().subscribe(data =>{
          this.epassarealist=data.Response;
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

    passschemelistopen(){
      this.passschemelistdropdown=!this.passschemelistdropdown;
    }
    passtypelistopen(){
      this.passtypelistdropdown=!this.passtypelistdropdown;
    }

    fromlocationlistopen (){
      this.fromlocationlistdropdown=!this.fromlocationlistdropdown;
    }
    tolocationlistopen (){
      this.tolocationlistdropdown=!this.tolocationlistdropdown;
    }
    updatestatefield(data){
      this.statelistdropdown=false;
      this.selstatename=data.statename;
      this.addfairdetailslocationform.patchValue({
          countrycode:data.countrycode,
          countryname:data.countryname,
          statecode:data.statecode,
          statename:data.statename,
          corporationcode:'',
          corporationname:'',
          citycode:'',
          cityname:'',
          passschemeno:'',
          passschemename:'',
          passtypeno:'',
          passtypename:'',
          restriction:'',
          duration:'',
          allovercity:'',
          fromlocation:'',
          tolocation:'',
          amount:'',
          searchstate:'',
          searchcorporation:'',
          searchcity:'',
          searchpassscheme:'',
      });
    }
    updatecorporationfield(data){
      this.corporationlistdropdown=false;
      this.selcorporationcode=data.corporationcode;
      this.addfairdetailslocationform.patchValue({
        countrycode:data.countrycode,
        countryname:data.countryname,
        statecode:data.statecode,
        statename:data.statename,
        corporationcode:data.corporationcode,
        corporationname:data.corporationname,
        citycode:'',
        cityname:'',
        passschemeno:'',
        passschemename:'',
        passtypeno:'',
        passtypename:'',
        restriction:'',
        duration:'',
        allovercity:'',
        fromlocation:'',
        tolocation:'',
        amount:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
        searchpassscheme:'',
     });
    }
   
    updatecityfield(data){
      this.citylistdropdown=false;
      this.selcitycode=data.citycode;
      this.selcorporationcode=data.corporationcode;
      this.selstatename=data.statename;
      this.addfairdetailslocationform.patchValue({
        countrycode:data.countrycode,
        countryname:data.countryname,
        statecode:data.statecode,
        statename:data.statename,
        corporationcode:data.corporationcode,
        corporationname:data.corporationname,
        citycode:data.citycode,
        cityname:data.cityname,
        passschemeno:'',
        passschemename:'',
        passtypeno:'',
        passtypename:'',
        restriction:'',
        duration:'',
        allovercity:'',
        fromlocation:'',
        tolocation:'',
        amount:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
        searchpassscheme:'',
      });
    }

    updatepassschemefield(data){
      this.passschemelistdropdown=false;
      this.selpassschemeno=data.passschemeno;
      this.addfairdetailslocationform.patchValue({
        countrycode:data.countrycode,
        countryname:data.countryname,
        statecode:data.statecode,
        statename:data.statename,
        corporationcode:data.corporationcode,
        corporationname:data.corporationname,
        citycode:data.citycode,
        cityname:data.cityname,
        passschemeno:data.passschemeno,
        passschemename:data.passschemename,
        passtypeno:'',
        passtypename:'',
        restriction:'',
        duration:'',
        allovercity:'',
        fromlocation:'',
        tolocation:'',
        amount:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
        searchpassscheme:'',
      });
    }

    updatepasstypefield(data){
      this.passtypelistdropdown=false;
     
      this.addfairdetailslocationform.patchValue({
        countrycode:data.countrycode,
        countryname:data.countryname,
        statecode:data.statecode,
        statename:data.statename,
        corporationcode:data.corporationcode,
        corporationname:data.corporationname,
        citycode:data.citycode,
        cityname:data.cityname,
        passschemeno:data.passschemeno,
        passschemename:data.passschemename,
        passtypeno:data.passtypeno,
        passtypename:data.passtypename,
        restriction:data.restriction,
        duration:'30',
        allovercity:'',
        fromlocation:'',
        tolocation:'',
        amount:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
        searchpassscheme:'',
      });
    }

    updatefromlocationfield(data){
      this.fromlocationlistdropdown=false;
     
      this.addfairdetailslocationform.patchValue({
       
        
        allovercity:'',
        fromlocation:data.areaname,
        tolocation:'',
        amount:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
        searchpassscheme:'',
      });
    }

    updatetolocationfield(data){
      this.tolocationlistdropdown=false;
     
      this.addfairdetailslocationform.patchValue({
        
        allovercity:'',
        
        tolocation:data.areaname,
        amount:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
        searchpassscheme:'',
      });
    }

    editformfieldupdate(data){
     
        this.editfairdetailslocationform.patchValue({
            countrycode:data.countrycode,
            countryname:data.countryname,
            statecode:data.statecode,
            statename:data.statename,
            corporationcode:data.corporationcode,
            corporationname:data.corporationname,
            citycode:data.citycode,
            cityname:data.cityname,
            passschemeno:data.passschemeno,
            passschemename:data.passschemename,
            passtypeno:data.passtypeno,
            passtypename:data.passtypename,
            restriction:data.restriction,
            duration:data.duration,
            allovercity:data.allovercity,
            fromlocation:data.fromlocation,
            tolocation:data.tolocation,
            amount:data.amount,
            status:data.status,
            sno:data.sno,
            
        });
    }

    addfairdetails(){
      if(this.addfairdetailslocationform.value.statename!=''){
        if(this.addfairdetailslocationform.value.corporationname!=''){
          if(this.addfairdetailslocationform.value.cityname!=''){
           
              if(this.addfairdetailslocationform.value.passschemename!=''){
                if(this.addfairdetailslocationform.value.passtypename!=''){
                  if(this.addfairdetailslocationform.value.fromlocation!=''){
                    if(this.addfairdetailslocationform.value.tolocation!=''){
                      if(this.addfairdetailslocationform.value.amount!=''){
                          this.Service.addfairdetails(this.addfairdetailslocationform.value.countrycode,this.addfairdetailslocationform.value.countryname,this.addfairdetailslocationform.value.statecode,this.addfairdetailslocationform.value.statename,this.addfairdetailslocationform.value.corporationcode,this.addfairdetailslocationform.value.corporationname,this.addfairdetailslocationform.value.citycode,this.addfairdetailslocationform.value.cityname,this.addfairdetailslocationform.value.passschemeno,this.addfairdetailslocationform.value.passschemename,
                          this.addfairdetailslocationform.value.passtypeno,this.addfairdetailslocationform.value.passtypename,this.addfairdetailslocationform.value.restriction,this.addfairdetailslocationform.value.duration,this.addfairdetailslocationform.value.allovercity,this.addfairdetailslocationform.value.fromlocation,this.addfairdetailslocationform.value.tolocation,this.addfairdetailslocationform.value.amount,this.userid).subscribe(data =>{
                            if(data.StatusCode==200){
                              this.addfairdetailslocationform.reset();
                              this.CheckUser();
                              this.Toastmessage.showSuccess(data.Message);
                              this.allfairdetailslocation();
                            }else{
                              this.Toastmessage.showError(data.Message);
                            }
                          });
                }else{
                  this.Toastmessage.showInfo('Enter Amount!');
                }
              }else{
                this.Toastmessage.showInfo('Enter To Location!');
              }
            }else{
              this.Toastmessage.showInfo('Enter From Location!');
            }
                }else{
                  this.Toastmessage.showInfo('Enter Pass Type Name!');
                }
               
              }else{
                this.Toastmessage.showInfo('Choose Pass Scheme Name!');
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


   

      editfairdetails(){
      if(this.editfairdetailslocationform.value.statename!='' && this.editfairdetailslocationform.value.corporationcode!='' && this.editfairdetailslocationform.value.cityname!='' && this.editfairdetailslocationform.value.passschemename!=''){
           
              if(this.editfairdetailslocationform.value.passschemename!=''){
               
                this.Service.editfairdetails(this.editfairdetailslocationform.value.countrycode,this.editfairdetailslocationform.value.countryname,this.editfairdetailslocationform.value.statecode,this.editfairdetailslocationform.value.statename,this.editfairdetailslocationform.value.corporationcode,this.editfairdetailslocationform.value.corporationname,this.editfairdetailslocationform.value.citycode,this.editfairdetailslocationform.value.cityname,this.editfairdetailslocationform.value.passschemeno,this.editfairdetailslocationform.value.passschemename,
                  this.editfairdetailslocationform.value.passtypeno,this.editfairdetailslocationform.value.passtypename,this.editfairdetailslocationform.value.restriction,this.editfairdetailslocationform.value.duration,this.editfairdetailslocationform.value.allovercity,this.editfairdetailslocationform.value.fromlocation,this.editfairdetailslocationform.value.tolocation,this.editfairdetailslocationform.value.amount,this.editfairdetailslocationform.value.status,this.editfairdetailslocationform.value.sno).subscribe(data =>{
                  if(data.StatusCode==200){
                    this.editfairdetailslocationform.reset();
                    this.Toastmessage.showSuccess(data.Message);
                    this.allfairdetailslocation();
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
              this.addfairdetailsxslx();
          }
          fileReader.readAsArrayBuffer(this.file);
        } else{
          this.Toastmessage.showError('Choose Excel File');
        }  
  }


  addfairdetailsxslx(){
     
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
        
        var passtypename=data[i].passtypename;
       
        var duration=30;
        var allovercity='';
        var fromlocation=data[i].fromlocation;
        var tolocation=data[i].tolocation;
        var amount=data[i].amount;
        this.getpassschemetypeno(countrycode,countryname,statecode,statename,corporationcode,corporationname,citycode,cityname,passschemename,passtypename,duration,allovercity,fromlocation,tolocation,amount);


        

      }

    }

    getpassschemetypeno(countrycode,countryname,statecode,statename,corporationcode,corporationname,citycode,cityname,passschemename,passtypename,duration,allovercity,fromlocation,tolocation,amount){
      this.Service.passschemetypenofind(statecode,corporationcode,citycode,passschemename,passtypename).subscribe(data =>{
         
        if(data.StatusCode==200){
          var passschemeno=data.Response[0].passschemeno;
          var passtypeno=data.Response[0].passtypeno;
          var restriction=data.Response[0].restriction;
          this.Service.addfairdetails(countrycode,countryname,statecode,statename,corporationcode,corporationname,citycode,cityname,passschemeno,passschemename,passtypeno,passtypename,restriction,duration,allovercity,fromlocation,tolocation,amount,this.userid).subscribe(data =>{
         
            if(data.StatusCode==200){
            
              this.allfairdetailslocation();
              this.Toastmessage.showSuccess(data.Message);
            }else{
              this.Toastmessage.showWarning(data.Message);
            }
            
          });
          
        }else{
          this.Toastmessage.showWarning(data.Message);
        }
        
      });
    }

}
      
    
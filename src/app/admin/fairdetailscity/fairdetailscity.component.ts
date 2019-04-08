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
  selector: 'app-fairdetailscity',
  templateUrl: './fairdetailscity.component.html',
  styleUrls: ['./fairdetailscity.component.css']
})
export class AppFairdetailscityComponent implements OnInit {
 
    public addfairdetailscityform:FormGroup;
    public editfairdetailscityform:FormGroup;
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
    allfairdetailscitylist:any;
    role='';
    ngOnInit() {
      this.userid=localStorage.getItem('UserId');
      
      this.addfairdetailscityform=this.fb.group({
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
      this.editfairdetailscityform=this.fb.group({
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
      this.allfairdetailscity();
   //   this.getrights();
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
      if(data.role === 'SubAdmin' || data.role === 'Admin'){
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
   
    allfairdetailscity(){
      this.Service.allfairdetailscity().subscribe(data =>{
          this.allfairdetailscitylist=data.Response;
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

   
    updatestatefield(data){
      this.statelistdropdown=false;
      this.selstatename=data.statename;
      this.addfairdetailscityform.patchValue({
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
      this.addfairdetailscityform.patchValue({
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
      this.selstatename=data.statename;
      this.selcorporationcode=data.corporationcode;
      this.selcitycode=data.citycode;
      this.addfairdetailscityform.patchValue({
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
      this.addfairdetailscityform.patchValue({
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
     
      this.addfairdetailscityform.patchValue({
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
        duration:1,
        allovercity:'allovercity',
        fromlocation:'',
        tolocation:'',
        amount:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
        searchpassscheme:'',
      });
    }

    editformfieldupdate(data){
     
        this.editfairdetailscityform.patchValue({
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
      if(this.addfairdetailscityform.value.statename!=''){
        if(this.addfairdetailscityform.value.corporationname!=''){
          if(this.addfairdetailscityform.value.cityname!=''){
           
              if(this.addfairdetailscityform.value.passschemename!=''){
                if(this.addfairdetailscityform.value.passtypename!=''){
                 
                        this.Service.addfairdetails(this.addfairdetailscityform.value.countrycode,this.addfairdetailscityform.value.countryname,this.addfairdetailscityform.value.statecode,this.addfairdetailscityform.value.statename,this.addfairdetailscityform.value.corporationcode,this.addfairdetailscityform.value.corporationname,this.addfairdetailscityform.value.citycode,this.addfairdetailscityform.value.cityname,this.addfairdetailscityform.value.passschemeno,this.addfairdetailscityform.value.passschemename,
                          this.addfairdetailscityform.value.passtypeno,this.addfairdetailscityform.value.passtypename,this.addfairdetailscityform.value.restriction,this.addfairdetailscityform.value.duration,this.addfairdetailscityform.value.allovercity,this.addfairdetailscityform.value.fromlocation,this.addfairdetailscityform.value.tolocation,this.addfairdetailscityform.value.amount,this.userid).subscribe(data =>{
                          if(data.StatusCode==200){
                            this.addfairdetailscityform.reset();
                            this.CheckUser();
                            this.Toastmessage.showSuccess(data.Message);
                            this.allfairdetailscity();
                          }else{
                            this.Toastmessage.showError(data.Message);
                          }
                        });
                      
                  
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
      if(this.editfairdetailscityform.value.statename!='' && this.editfairdetailscityform.value.corporationcode!='' && this.editfairdetailscityform.value.cityname!='' && this.editfairdetailscityform.value.passschemename!=''){
           
              if(this.editfairdetailscityform.value.passschemename!=''){
               
                this.Service.editfairdetails(this.editfairdetailscityform.value.countrycode,this.editfairdetailscityform.value.countryname,this.editfairdetailscityform.value.statecode,this.editfairdetailscityform.value.statename,this.editfairdetailscityform.value.corporationcode,this.editfairdetailscityform.value.corporationname,this.editfairdetailscityform.value.citycode,this.editfairdetailscityform.value.cityname,this.editfairdetailscityform.value.passschemeno,this.editfairdetailscityform.value.passschemename,
                  this.editfairdetailscityform.value.passtypeno,this.editfairdetailscityform.value.passtypename,this.editfairdetailscityform.value.restriction,this.editfairdetailscityform.value.duration,this.editfairdetailscityform.value.allovercity,this.editfairdetailscityform.value.fromlocation,this.editfairdetailscityform.value.tolocation,this.editfairdetailscityform.value.amount,this.editfairdetailscityform.value.status,this.editfairdetailscityform.value.sno).subscribe(data =>{
                  if(data.StatusCode==200){
                    this.editfairdetailscityform.reset();
                    this.Toastmessage.showSuccess(data.Message);
                    this.allfairdetailscity();
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
        
        var duration=1;
        var allovercity='allovercity';
        var fromlocation='';
        var tolocation='';
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
            
              this.allfairdetailscity();
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
      
    
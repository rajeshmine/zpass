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
  selector: 'app-passtype',
  templateUrl: './passtype.component.html',
  styleUrls: ['./passtype.component.css']
})
export class AppPasstypeComponent implements OnInit {
 
    public addpasstypeform:FormGroup;
    public editpasstypeform:FormGroup;
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
    allpasstypelist:any;
    busservicelist:any;
    editformclicked=false;
    role='';
    ngOnInit() {
      this.userid=localStorage.getItem('UserId');
      
      this.addpasstypeform=this.fb.group({
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
        passtypename:'',
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
        searchpassscheme:'',

      });
      this.editpasstypeform=this.fb.group({
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
        passtypename:'',
        status:'',
        passtypeno:'',
      });
    
      this.epassstate();
      this.epasscorporation();
      this.epasscity();
      this.passscheme();
      this.allpasstype();
      this.busservice();
      this.CheckUser();
   //   this.getrights();
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
    passscheme(){
      this.Service.passscheme().subscribe(data =>{
        this.passschemelist=data.Response;
        
      });
    }

    busservice(){
      this.Service.busservice().subscribe(data =>{
        if(data.StatusCode === 200){
          this.busservicelist=data.Response;
         
          this.getrights();
        }
        
      });
    }


    restriction=[];
	getrights(){
    this.restriction.length=0; 
    if(this.busservicelist){
      for(var j=0;j<this.busservicelist.length;j++){
		  	this.restriction.push({"RightName":this.busservicelist[j].busservicename,"Status":false});
	  	}	
    }
				  
	} 

    checkedrights=[];
    getcheckedrights(event,busservicelist){    
      if(event.target.checked===true){
        this.checkedrights.push(busservicelist);		 
        
      }else{
        this.checkedrights = this.checkedrights.filter(item => item !== busservicelist);	
       
      }		
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

    allpasstype(){
      this.Service.allpasstype().subscribe(data =>{
          this.allpasstypelist=data.Response;
      });
    }
    updatestatefield(data){
      this.statelistdropdown=false;
      this.selstatename=data.statename;
      this.addpasstypeform.patchValue({
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
          searchstate:'',
          searchcorporation:'',
          searchcity:'',
          searchpassscheme:'',
      });
    }
    updatecorporationfield(data){
      this.corporationlistdropdown=false;
      this.selcorporationcode=data.corporationcode;
      this.addpasstypeform.patchValue({
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
   

      this.addpasstypeform.patchValue({
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
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
        searchpassscheme:'',
      });
    }

    updatepassschemefield(data){
      this.passschemelistdropdown=false;
     
      this.addpasstypeform.patchValue({
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
        searchstate:'',
        searchcorporation:'',
        searchcity:'',
        searchpassscheme:'',
      });
    }

    editformfieldupdate(data){
    
     this.editformclicked=true;
        this.editpasstypeform.patchValue({
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
            passtypename:data.passtypename,
            status:data.status,
            passtypeno:data.passtypeno,
            
        });
        // Rights split
        this.checkedrights.length=0;
        var Previesrestrictions=data.restriction.split(',');
        this.LoggerService.Debug(Previesrestrictions);
        for(var i=0;i < this.restriction.length;i++){
          this.restriction[i].Status=false;
        }
        for(var i=0;i<Previesrestrictions.length;i++){
          for(var j=0;j< this.restriction.length;j++){
            if(Previesrestrictions[i].toLowerCase() === this.restriction[j].RightName.toLowerCase()){
              this.restriction[j].Status=true;
              this.checkedrights.push(this.restriction[j].RightName);		 
              
            }
          }
        }

       

    }

    addpasstype(){
      if(this.addpasstypeform.value.statename!=''){
        if(this.addpasstypeform.value.corporationname!=''){
          if(this.addpasstypeform.value.cityname!=''){
           
              if(this.addpasstypeform.value.passschemename!=''){
                if(this.addpasstypeform.value.passtypename!=''){
                  this.Service.addpasstype(this.addpasstypeform.value.countrycode,this.addpasstypeform.value.countryname,this.addpasstypeform.value.statecode,this.addpasstypeform.value.statename,this.addpasstypeform.value.corporationcode,this.addpasstypeform.value.corporationname,this.addpasstypeform.value.citycode,this.addpasstypeform.value.cityname,this.addpasstypeform.value.passschemeno,this.addpasstypeform.value.passschemename,this.addpasstypeform.value.passtypename,this.checkedrights,this.userid).subscribe(data =>{
                    if(data.StatusCode==200){
                      this.addpasstypeform.reset();
                      this.CheckUser();
                      this.Toastmessage.showSuccess(data.Message);
                      this.allpasstype();
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


   

    editpasstype(){

      if(this.editpasstypeform.value.statename!='' && this.editpasstypeform.value.corporationcode!='' && this.editpasstypeform.value.cityname!='' && this.editpasstypeform.value.passschemename!=''){
           
              if(this.editpasstypeform.value.passschemename!=''){
               
                this.Service.editpasstype(this.editpasstypeform.value.countrycode,this.editpasstypeform.value.countryname,this.editpasstypeform.value.statecode,this.editpasstypeform.value.statename,this.editpasstypeform.value.corporationcode,this.editpasstypeform.value.corporationname,this.editpasstypeform.value.citycode,this.editpasstypeform.value.cityname,this.editpasstypeform.value.passschemeno,this.editpasstypeform.value.passschemename,this.editpasstypeform.value.passtypename,this.editpasstypeform.value.status,this.editpasstypeform.value.passtypeno,this.checkedrights).subscribe(data =>{
                  if(data.StatusCode==200){
                    this.editpasstypeform.reset();
                    this.checkedrights.length=0;
                    this.Toastmessage.showSuccess(data.Message);
                    for(var i=0;i<this.restriction.length;i++){
                      this.restriction[i].Status=false;
                    }
                    this.allpasstype();
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
              this.addpasstypexslx();
          }
          fileReader.readAsArrayBuffer(this.file);
        } else{
          this.Toastmessage.showError('Choose Excel File');
        }
  }


  addpasstypexslx(){
     
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
        var restriction=data[i].restriction;


        
        this.Service.passschemenofind(statecode,corporationcode,citycode,passschemename).subscribe(data =>{
         
          if(data.StatusCode==200){
            var passschemeno=data.Response[0].passschemeno;
            
            this.Service.addpasstype(countrycode,countryname,statecode,statename,corporationcode,corporationname,citycode,cityname,passschemeno,passschemename,passtypename,restriction,this.userid).subscribe(data =>{
         
              if(data.StatusCode==200){
                
                
                this.Toastmessage.showSuccess(data.Message);
              }else{
                this.Toastmessage.showError(data.Message);
              }
              
            });
    




          }else{
            this.Toastmessage.showError(data.Message);
          }
          
        });


       

      }

    }

  





}
      
    
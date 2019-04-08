import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from './../../service/service.service';
import { LoggerService } from './../../logger/logger.service';
import { Http,Headers,Request,Response} from '@angular/http';
import {Toastmessage} from './../../config/toaster.component'
import * as XLSX from 'ts-xlsx';
@Component({
  selector: 'app-addstate',
  templateUrl: './addstate.component.html',
  styleUrls: ['./addstate.component.css']
})
export class AppAddStateComponent implements OnInit {
  title = 'app';
  p: number = 1;
  collection: any[];  
  StateListsForm:FormGroup;
  EditStateForm:FormGroup;
  constructor(private Form:FormBuilder,private Service:ServiceService,private LoggerService:LoggerService,private Toastmessage:Toastmessage) {
   
  }
  userid:any;
  theme='';
  ngOnInit() {
    this.userid=localStorage.getItem("UserId");
    this.StateListsForm = this.Form.group({
      countrycode:null,
      countryname:null,
      statecode:null,
      statename:null,
      searchstate:null,
      
    });
    this.EditStateForm = this.Form.group({
      statename:null,
      status:null,
      countrycode:null,
      countryname:null,
      statecode:null,

    })
    this.statelistindia();
    this.viewpassstate();
    this.CheckUser();
  }
  ngOnChanges(){
   
  }
   

  CheckUser(){
    this.Service.epasscheckuser(this.userid).subscribe(data => {
      this.theme=data.Response[0].theme;
      this.LoggerService.Debug(this.theme)
    });
  }

  setstate(data){ 
    
    this.statelistdiv=false;
    this.StateListsForm.patchValue(
      {      
      
        countrycode:data.country,
        countryname:data.countryname,
        statecode:data.abbr,
        statename:data.name,
      }
    )
  }

  statelistdiv=false;
  statelistdivopen(){
    this.statelistdiv=!this.statelistdiv;
  }


  //statelistindia
  statelist:any;
  statelistindia(){
    this.Service.statelistindia()
    .subscribe(data =>{
        this.statelist=data.Response;
       
    })
  }
  //addpassstate
  addepassstate(){
    if(this.StateListsForm.value.statename!='' && this.StateListsForm.value.statename!=null && this.StateListsForm.value.statename!=undefined){
    this.Service.addepassstate(this.StateListsForm.value.countrycode,this.StateListsForm.value.countryname,this.StateListsForm.value.statecode,this.StateListsForm.value.statename,this.userid)

      .subscribe(data => {
    

            if(data.StatusCode==200){
              this.Toastmessage.showSuccess(data.Message);
             
              this.StateListsForm.reset();
              this.viewpassstate();
            }else if(data.StatusCode==400){
              this.Toastmessage.showInfo(data.Message)
            }
        
      })
    }else {
      this.Toastmessage.showInfo('Enter state Name');
    }
    
  }

  //viewpassstate
  viewstates:any;
  viewpassstate(){

    this.Service.viewpassstate()
    .subscribe(data => {
      this.viewstates=data.Response;
     
    })

  }  

 //Edit State
 sno=0;
 editstate(Valuegot){
  
   this.sno=Valuegot.sno
   this.EditStateForm.setValue({
    statename:Valuegot.statename,
    status:Valuegot.status,
    countrycode:Valuegot.countrycode,
    countryname:Valuegot.countryname,
    statecode:Valuegot.statecode,
    
   });
 }
   
 //Update State 

 updatestate(){

  this.Service.updatestate(this.EditStateForm.value.countrycode,this.EditStateForm.value.countryname,this.EditStateForm.value.statecode,this.EditStateForm.value.statename,this.EditStateForm.value.status,this.sno)
  .subscribe(data =>{
    if(data.StatusCode==200){
      this.Toastmessage.showSuccess(data.Message);
      
      this.EditStateForm.reset();
      this.viewpassstate();
    }else if(data.StatusCode==400){
      this.Toastmessage.showError(data.Message);
    } 
  })

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
             this.addepassstatexlsx();
         }
         fileReader.readAsArrayBuffer(this.file);
        } else{
          this.Toastmessage.showError('Choose Excel File');
        }   
 }


 addepassstatexlsx(){
    
     var data=this.corporationxlsxdata;
     for(var i=0;i<data.length;i++){
      
       var countrycode=data[i].countrycode;
       var countryname=data[i].countryname;
       var statecode=data[i].statecode;
       var statename=data[i].statename;
      

       this.Service.addepassstate(countrycode,countryname,statecode,statename,this.userid).subscribe(data =>{
       
         if(data.StatusCode==200){
           
           this.viewpassstate();
           this.Toastmessage.showSuccess(data.Message);
         }else{
           this.Toastmessage.showWarning(data.Message);
         }
         
       });


     }

   }





}

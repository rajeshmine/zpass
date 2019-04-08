import { Component, OnInit, OnChanges, OnDestroy, AfterContentInit, ViewContainerRef  } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from './../../service/service.service';
import { LoggerService } from './../../logger/logger.service';
import { Http,Headers,Request,Response} from '@angular/http';
import {Toastmessage} from './../../config/toaster.component'
import * as XLSX from 'ts-xlsx';
@Component({
  selector: 'app-addarea',
  templateUrl: './addarea.component.html',
  styleUrls: ['./addarea.component.css']
})
export class AppAddAreaComponent implements OnInit,OnChanges,OnDestroy,AfterContentInit {
  title = 'app';
  p: number = 1;
  collection: any[];  
  citylistdropdown = false;
  corporationlistdropdown = false;
  statelistdiv = false;
  AddareaForm:FormGroup;
  EditAreaForm:FormGroup;
  role='';
  constructor(private Form:FormBuilder,private Service:ServiceService,private LoggerService:LoggerService,private Toastmessage:Toastmessage) {
   
  }
  userid:any;
  theme='';
  ngOnInit() {
    this.userid=localStorage.getItem("UserId");
    this.AddareaForm = this.Form.group({
      statecode:null,
		  statename:null,
		  citycode:null,
		  cityname:null,
		  corporationname:null,
		  searchstate:null,
		  updateby:null,
		  searchcity:null,
		  searchcorporation:null,
      countrycode:null,
      countryname:null,
      areaname:null,
      areacode:null,
      corporationcode:null,
      
    });
    this.EditAreaForm = this.Form.group({
      statecode:null,
      statename:null,
      corporationcode:null,
      corporationname:null,
      citycode:null,
      cityname:null,
      areacode:null,
      areaname:null,
      status:null,
    });
    this.epassstate();
    this.epasscorporation();
    this.epasscity();
    this.CheckUser();
    this.allepassarea();
  }
  ngOnChanges(){
  }
  ngOnDestroy(){

  }
  ngAfterContentInit(){

  }

  CheckUser(){
    this.Service.epasscheckuser(this.userid).subscribe(data => {
      this.theme=data.Response[0].theme;
      this.LoggerService.Debug(this.theme);
      this.formvalueset(data.Response[0]);    
    });
  }
  formvalueset(data){
    this.role=data.role;
    if(data.role === 'SubAdmin' || data.role === 'Admin' ){
     this.updatecityfield(data);
    }
  }


  statelist:any;
  epassstate(){
    this.Service.epassstate()
    .subscribe(data =>{
        this.statelist=data.Response;
      
    })
  }
  statelistdivopen(){
    this.statelistdiv=!this.statelistdiv;
  }
  setstate(data){ 
  
    this.statelistdiv=false;
    this.AddareaForm.patchValue(
      {      
      
        countrycode:data.countrycode,
        countryname:data.countryname,
        statecode:data.statecode,
        statename:data.statename,
      }
    )
  }

  corporationlist:any;
	epasscorporation(){
		this.Service.epasscorporation()
			.subscribe(data => {
      this.corporationlist = data.Response;
      
		})
	}
	corporationlistopen(){
		this.corporationlistdropdown =! this.corporationlistdropdown;
	}
	updatecorportion(data){
		this.corporationlistdropdown = false;
		this.AddareaForm.patchValue({
      corporationcode:data.corporationcode,
      corporationname:data.corporationname,
      countrycode:data.countrycode,
      countryname:data.countryname,   
			statecode:data.statecode,
			statename:data.statename,   
		})
  }
  
  citylist:any;
	epasscity(){
		this.Service.epasscity()
			.subscribe(data =>{
			this.citylist = data.Response;  
     
		})
	}
	citylistopen(){
		this.citylistdropdown=!this.citylistdropdown;
	}
	updatecityfield(data){
		this.citylistdropdown=false;
		this.AddareaForm.patchValue({
			citycode:data.citycode,
			cityname: data.cityname,
      corporationcode:data.corporationcode,
      corporationname:data.corporationname,
      countrycode:data.countrycode,
      countryname:data.countryname,
      statecode:data.statecode,
      statename:data.statename,
		});
	}


  //addepassarea
  addepassarea(){
    
    if(this.AddareaForm.value.statename!='' && this.AddareaForm.value.statename!=null && this.AddareaForm.value.statename!=undefined){
      if(this.AddareaForm.value.corporationname!='' && this.AddareaForm.value.corporationname!=null && this.AddareaForm.value.corporationname!=undefined){
        if(this.AddareaForm.value.cityname!='' && this.AddareaForm.value.cityname!=null && this.AddareaForm.value.cityname!=undefined){
          if(this.AddareaForm.value.areacode!='' && this.AddareaForm.value.areacode!=null && this.AddareaForm.value.areacode!=undefined){
            if(this.AddareaForm.value.areaname!='' && this.AddareaForm.value.areaname!=null && this.AddareaForm.value.areaname!=undefined){
                  this.Service.addepassarea(this.AddareaForm.value.countrycode,this.AddareaForm.value.countryname,this.AddareaForm.value.statecode,this.AddareaForm.value.statename,this.AddareaForm.value.corporationcode,this.AddareaForm.value.corporationname,this.AddareaForm.value.citycode,this.AddareaForm.value.cityname,this.AddareaForm.value.areacode,this.AddareaForm.value.areaname,this.userid)
                    .subscribe(data => {
                        if(data.StatusCode==200){
                          this.Toastmessage.showSuccess(data.Message);
                         
                          this.AddareaForm.reset();
                          this.CheckUser();
                          this.allepassarea();
                        }else if(data.StatusCode==400){
                          this.Toastmessage.showInfo(data.Message)
                        }
                    })
                  }else{
                    this.Toastmessage.showInfo('Enter the Area Name');
                  }
                }else{
                  this.Toastmessage.showInfo('Enter the Area Code');
                }
            }else{
              this.Toastmessage.showInfo('Choose the City Name');
            }

          }else{
            this.Toastmessage.showInfo('Choose the Corporation Name');
          }

      }else{
        this.Toastmessage.showInfo('Choose the State Name');
      }
  }

  //viewpassarea
  viewarea:any;
  allepassarea(){

    this.Service.allepassarea()
    .subscribe(data => {
      this.viewarea=data.Response;
    
    })

  }  

 //Edit Area
 sno=0;
 editarea(Valuegot){
   this.sno=Valuegot.sno
   this.EditAreaForm.patchValue({
    statecode:Valuegot.statecode,
    statename:Valuegot.statename,
    corporationcode:Valuegot.corporationcode,
    corporationname:Valuegot.corporationname,
    citycode:Valuegot.citycode,
    cityname:Valuegot.cityname,
    areacode:Valuegot.areacode,
    areaname:Valuegot.areaname,
    status:Valuegot.status,
    
   });
 }

  //Update Area 

  editepassarea(){
  
    this.Service.editepassarea(this.EditAreaForm.value.statecode,this.EditAreaForm.value.statename,this.EditAreaForm.value.corporationcode,this.EditAreaForm.value.corporationname,this.EditAreaForm.value.citycode,this.EditAreaForm.value.cityname,this.EditAreaForm.value.areacode,this.EditAreaForm.value.areaname,this.EditAreaForm.value.status,this.sno)
    .subscribe(data =>{
      if(data.StatusCode==200){
        this.Toastmessage.showSuccess(data.Message);
      
        this.EditAreaForm.reset();
        this.allepassarea();
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
              this.addepassareaxlsx();
          }
          fileReader.readAsArrayBuffer(this.file);
        } else{
          this.Toastmessage.showError('Choose Excel File');
        }
      
  }


  addepassareaxlsx(){
  
    if(data!=''){

   
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
        var areacode=data[i].areacode;
        var areaname=data[i].areaname;

        this.Service.addepassarea(countrycode,countryname,statecode,statename,corporationcode,corporationname,citycode,cityname,areacode,areaname,this.userid).subscribe(data =>{
          
          if(data.StatusCode==200){
            
            this.epasscorporation();
            this.Toastmessage.showSuccess(data.Message);
          }else{
            this.Toastmessage.showWarning(data.Message);
          }
          
        });


      }

    }else{
      this.Toastmessage.showError('Choose Excel File');
    }

  }



}
  
import { Component, OnInit, OnChanges, OnDestroy, AfterContentInit, ViewContainerRef  } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from './../../service/service.service';
import { LoggerService } from './../../logger/logger.service';
import { Http,Headers,Request,Response} from '@angular/http';
import {Toastmessage} from './../../config/toaster.component';
import * as XLSX from 'ts-xlsx';

@Component({
  selector: 'app-addcounter',
  templateUrl: './addcounter.component.html',
  styleUrls: ['./addcounter.component.css']
})
export class AppAddCounterComponent implements OnInit,OnChanges,OnDestroy,AfterContentInit {
  
  p: number = 1;
  collection: any[];  
  citylistdropdown = false;
  corporationlistdropdown = false;
  arealistdropdown = false;
  statelistdiv = false;
  AddcounterForm:FormGroup;
  EditCounterForm:FormGroup;
  role='';
  constructor(private Form:FormBuilder,private Service:ServiceService,private LoggerService:LoggerService,private Toastmessage:Toastmessage) {
   
  }
  userid:any;
  theme='';
  ngOnInit() {
    this.userid=localStorage.getItem("UserId");
    this.AddcounterForm = this.Form.group({
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
      countercode:null,
      countername:null,
      
    });

    this.EditCounterForm=this.Form.group({

      countrycode:null,
      countryname:null,
      statecode:null,
      statename:null,
      corporationcode:null,
      corporationname:null,
      citycode:null,
      cityname:null,
      areacode:null,
      areaname:null,
      countercode:null,
      countername:null,
      status:null,
      sno:null,

    });

    this.epassstate();
    this.epasscorporation();
    this.epasscity();
    this.epassarea();
    this.CheckUser();
    this.allepasscounter();
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
      this.LoggerService.Debug(this.theme)
      this.formvalueset(data.Response[0]);  
    });
  }
  formvalueset(data){
    this.role=data.role;
    if(data.role === 'SubAdmin' || data.role ==='Admin'){
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
    this.AddcounterForm.patchValue(
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
		this.AddcounterForm.patchValue({
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
		this.AddcounterForm.patchValue({
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


  arealist:any;
	epassarea(){
		this.Service.epassarea()
			.subscribe(data =>{
			this.arealist = data.Response;  
     
		})
	}
	arealistopen(){
		this.arealistdropdown=!this.arealistdropdown;
	}
	updateareafield(data){
		this.arealistdropdown=false;
		this.AddcounterForm.patchValue({
      areacode:data.areacode,
      areaname:data.areaname,
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
  
    //addepasscounter
    addepasscounter(){
    
      if(this.AddcounterForm.value.statename!='' && this.AddcounterForm.value.statename!=null && this.AddcounterForm.value.statename!=undefined){
        if(this.AddcounterForm.value.corporationname!='' && this.AddcounterForm.value.corporationname!=null && this.AddcounterForm.value.corporationname!=undefined){
          if(this.AddcounterForm.value.cityname!='' && this.AddcounterForm.value.cityname!=null && this.AddcounterForm.value.cityname!=undefined){
            if(this.AddcounterForm.value.areacode!='' && this.AddcounterForm.value.areacode!=null && this.AddcounterForm.value.areacode!=undefined){
              if(this.AddcounterForm.value.areaname!='' && this.AddcounterForm.value.areaname!=null && this.AddcounterForm.value.areaname!=undefined){
                if(this.AddcounterForm.value.countercode!='' && this.AddcounterForm.value.countercode!=null && this.AddcounterForm.value.countercode!=undefined){
                  if(this.AddcounterForm.value.countername!='' && this.AddcounterForm.value.countername!=null && this.AddcounterForm.value.countername!=undefined){
                        this.Service.addepasscounter(this.AddcounterForm.value.countrycode,this.AddcounterForm.value.countryname,this.AddcounterForm.value.statecode,this.AddcounterForm.value.statename,this.AddcounterForm.value.corporationcode,this.AddcounterForm.value.corporationname,this.AddcounterForm.value.citycode,this.AddcounterForm.value.cityname,this.AddcounterForm.value.areacode,this.AddcounterForm.value.areaname,this.AddcounterForm.value.countercode,this.AddcounterForm.value.countername,this.userid)
      
                          .subscribe(data => {
                              if(data.StatusCode==200){
                                this.Toastmessage.showSuccess(data.Message);
                               
                                this.AddcounterForm.reset();
                                this.CheckUser();
                              }else if(data.StatusCode==400){
                                this.Toastmessage.showInfo(data.Message)
                              }
                          })
                        }else{
                          this.Toastmessage.showInfo('Enter the Counter Name');
                        }
                      }else{
                        this.Toastmessage.showInfo('Enter the Counter Code');
                      }
                    }else{
                      this.Toastmessage.showInfo('Choose the Area Name');
                    }
                  }else{
                    this.Toastmessage.showInfo('Choose the Area Code');
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


  //viewpasscounter
  viewcounter:any;
  allepasscounter(){

    this.Service.allepasscounter()
    .subscribe(data => {
      this.viewcounter=data.Response;
     
    })

  } 

  //Edit Counter
 sno=0;
 editcounter(Valuegot){
  
   this.sno=Valuegot.sno
   this.EditCounterForm.patchValue({
    countrycode:Valuegot.countrycode,
    countryname:Valuegot.countryname,
    statecode:Valuegot.statecode,
    statename:Valuegot.statename,
    corporationcode:Valuegot.corporationcode,
    corporationname:Valuegot.corporationname,
    citycode:Valuegot.citycode,
    cityname:Valuegot.cityname,
    areacode:Valuegot.areacode,
    areaname:Valuegot.areaname,
    countercode:Valuegot.countercode,
    countername:Valuegot.countername,
    status:Valuegot.status,
    sno:Valuegot.sno,
    
   });
 }

  //Update Counter 

  editepasscounter(){
    
    this.Service.editepasscounter(this.EditCounterForm.value.countrycode,this.EditCounterForm.value.countryname,this.EditCounterForm.value.statecode,this.EditCounterForm.value.statename,this.EditCounterForm.value.corporationcode,this.EditCounterForm.value.corporationname,this.EditCounterForm.value.citycode,this.EditCounterForm.value.cityname,this.EditCounterForm.value.areacode,this.EditCounterForm.value.areaname,this.EditCounterForm.value.countercode,this.EditCounterForm.value.countername,this.EditCounterForm.value.status,this.EditCounterForm.value.sno)
    .subscribe(data =>{
      if(data.StatusCode==200){
        this.Toastmessage.showSuccess(data.Message);
       
        this.EditCounterForm.reset();
        this.allepasscounter();
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
              this.addepasscounterxslx();
          }
          fileReader.readAsArrayBuffer(this.file);
        } else{
          this.Toastmessage.showError('Choose Excel File');
        } 
  }


  addepasscounterxslx(){
    
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
        var countercode=data[i].countercode;
        var countername=data[i].countername;

        this.Service.addepasscounter(countrycode,countryname,statecode,statename,corporationcode,corporationname,citycode,cityname,areacode,areaname,countercode,countername,this.userid).subscribe(data =>{
         
          if(data.StatusCode==200){
            
           
            this.Toastmessage.showSuccess(data.Message);
          }else{
            this.Toastmessage.showWarning(data.Message);
          }
          
        });


      }

    }


}
  
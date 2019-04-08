import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {FormBuilder,FormControl, FormGroup, Validators} from '@angular/forms'
import {ServiceService } from './../../service/service.service';
import {LoggerService } from './../../logger/logger.service';
import {Http,Headers,Request,Response} from '@angular/http';
import {AppComponent} from './../../app.component'
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
import {Toastmessage} from './../../config/toaster.component';
import * as XLSX from 'ts-xlsx';

declare var $:any;

@Component({
  selector: 'app-conductorlogin',
  templateUrl: './conductorlogin.component.html',
  styleUrls: ['./conductorlogin.component.css']
})

export class AppConductorloginComponent implements OnInit {
 
    public addconductorloginform:FormGroup;
    public editconductorloginform:FormGroup;
    constructor(private fb:FormBuilder,private Service :ServiceService,private LoggerService:LoggerService,private AppComponent:AppComponent,private router: Router,private toastr: ToastrService, vcr: ViewContainerRef,private Toastmessage:Toastmessage) {}
        
	// Variable Declaration
	theme:'';
    userid:any;
    selstatename:any;
	alluserlist:any;    
    epasscitylist:any;
    epassstatelist:any;
    epasscorporationlist:any;
	selcorporationcode:any;    
	statelistdropdown=false;
	citylistdropdown=false;
	corporationlistdropdown=false;
    role='';
    ngOnInit() {
		this.userid=localStorage.getItem('UserId');      
		this.addconductorloginform=this.fb.group({       
			statecode:'',
			statename:'',
			corporationcode:'',
			corporationname:'',
			citycode:'',
			cityname:'',
			mobileno:'',
			password:'epass123',
			role:'Conductor',
			email:'',
			name:'',
			rights:'',
			areaname:'',
			areacode:'',       
			searchstate:'',
			searchcorporation:'',
			searchcity:''
		});
		
		this.editconductorloginform=this.fb.group({      
			statecode:'',
			statename:'',
			corporationcode:'',
			corporationname:'',
			citycode:'',
			cityname:'',
			mobileno:'',
			password:'',
			role:'Conductor',
			email:'',
			name:'',
			rights:'',
			areaname:'',
			areacode:'',
			userid:'',
			status:''       
		});
    
		this.epassstate();
		this.epasscorporation();
		this.epasscity();
		this.userlist();
		this.CheckUser();
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
		if(data.role === 'Counter' || data.role ==='Admin' ||  data.role === 'SubAdmin'){
			this.updatecityfield(data);
		}
	}
	

	userlist(){
    this.Service.userlist('Conductor')
		.subscribe(data =>{
			this.alluserlist=data.Response;
		});
    }	
	
    epassstate(){
    this.Service.epassstate()
		.subscribe(data =>{
			this.epassstatelist=data.Response;
		});
    }
	
	statelistopen(){
      this.statelistdropdown=!this.statelistdropdown;
    }
	
	updatestatefield(data){
		this.statelistdropdown=false;
		this.selstatename=data.statename;
		this.addconductorloginform.patchValue({         
			statecode:data.statecode,
			statename:data.statename,
			corporationcode:'',
			corporationname:'',
			citycode:'',
			cityname:'',
			mobileno:'',
			password:'epass123', 
			role:'Conductor',
			email:'',
			name:'',
			rights:'',
			areaname:'',
			areacode:'',
			searchstate:'',
			searchcorporation:'',
			searchcity:'',
		});
    }
	
    epasscorporation(){
    this.Service.epasscorporation()
		.subscribe(data =>{
			this.epasscorporationlist=data.Response;
		});
    }
	
	corporationlistopen(){
      this.corporationlistdropdown=!this.corporationlistdropdown;
    }
	
	updatecorporationfield(data){
		this.corporationlistdropdown=false;
		this.selcorporationcode=data.corporationcode;
		this.addconductorloginform.patchValue({      
			statecode:data.statecode,
			statename:data.statename,
			corporationcode:data.corporationcode,
			corporationname:data.corporationname,
			citycode:'',
			cityname:'',
			mobileno:'',
			password:'epass123',
			role:'Conductor',
			email:'',
			name:'',
			rights:'',
			areaname:'',
			areacode:'',		  
			searchstate:'',
			searchcorporation:'',
			searchcity:''        
		});
    }
	
    epasscity(){
      this.Service.epasscity().subscribe(data =>{
        this.epasscitylist=data.Response;
      });
    }

    citylistopen(){
      this.citylistdropdown=!this.citylistdropdown;
    }

    updatecityfield(data){
		this.citylistdropdown=false;     
		this.selcorporationcode=data.corporationcode;
		this.selcorporationcode=data.corporationcode;

		this.addconductorloginform.patchValue({       
			statecode:data.statecode,
			statename:data.statename,
			corporationcode:data.corporationcode,
			corporationname:data.corporationname,
			citycode:data.citycode,
			cityname:data.cityname,
			mobileno:'',
			password:'epass123', 
			role:'Conductor',
			email:'',
			name:'',
			rights:'',
			areaname:'',
			areacode:'',		  
			searchstate:'',
			searchcorporation:'',
			searchcity:''        
		});
    }

    editformfieldupdate(data){   
		$("#editform").show();      
        this.editconductorloginform.patchValue({
            countrycode:data.countrycode,
            countryname:data.countryname,
            statecode:data.statecode,
            statename:data.statename,
            corporationcode:data.corporationcode,
            corporationname:data.corporationname,
            citycode:data.citycode,
            cityname:data.cityname,
            mobileno:data.mobileno,
            password:data.password,
            role:'Conductor',
            email:data.email,
            name:data.name,
            rights:'',
            areaname:'',
            areacode:'',           
            status:data.status,
            userid:data.userid            
        });
    }

    epassuserregister(){
		if(this.addconductorloginform.value.statename!=''){
			if(this.addconductorloginform.value.corporationname!=''){
				if(this.addconductorloginform.value.cityname!=''){           
					if(this.addconductorloginform.value.passschemename!=''){
						this.Service.epassuserregister(this.addconductorloginform.value.mobileno,this.addconductorloginform.value.password,this.addconductorloginform.value.role,this.addconductorloginform.value.email,this.addconductorloginform.value.name,this.addconductorloginform.value.rights,this.addconductorloginform.value.statecode,this.addconductorloginform.value.statename,this.addconductorloginform.value.citycode,this.addconductorloginform.value.cityname,this.addconductorloginform.value.corporationcode, this.addconductorloginform.value.corporationname,this.addconductorloginform.value.areaname,this.addconductorloginform.value.areacode,this.userid)
							.subscribe(data =>{
								if(data.StatusCode==200){
									this.addconductorloginform.reset();
									this.CheckUser();
									this.Toastmessage.showSuccess(data.Message);
									this.userlist();
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

    edituser(){
		if(this.editconductorloginform.value.statename!='' && this.editconductorloginform.value.corporationcode!='' && this.editconductorloginform.value.cityname!=''){
			if(this.editconductorloginform.value.passschemename!=''){               
                this.Service.edituser(this.editconductorloginform.value.userid,this.editconductorloginform.value.name,this.editconductorloginform.value.email,this.editconductorloginform.value.mobileno,this.editconductorloginform.value.password,this.editconductorloginform.value.rights,this.editconductorloginform.value.statecode,this.editconductorloginform.value.statename,this.editconductorloginform.value.citycode,this.editconductorloginform.value.cityname,this.editconductorloginform.value.corporationcode,this.editconductorloginform.value.corporationname,this.editconductorloginform.value.areaname,this.editconductorloginform.value.areacode,this.editconductorloginform.value.status)
					.subscribe(data =>{
						if(data.StatusCode==200){
							this.editconductorloginform.reset();
							this.Toastmessage.showSuccess(data.Message);
							$('#editform').hide();
							this.userlist();
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
}    
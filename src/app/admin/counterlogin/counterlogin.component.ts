import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl,Validators} from '@angular/forms'; 

import {ServiceService } from './../../service/service.service';
import {Toastmessage} from './../../config/toaster.component'

@Component({
  selector: 'app-counterlogin',
  templateUrl: './counterlogin.component.html',
  styleUrls: ['./counterlogin.component.css']
})

export class AppCounterloginComponent implements OnInit{ 

	epassuserregisterform:FormGroup;
	EditCounterForm:FormGroup;
	userid:any;  
	theme='';
	citylistdropdown=false;
	statelistdropdown=false;
	corporationlistdropdown=false;
	arealistdropdown=false;
	role='';

	constructor( public fb:FormBuilder,private Service:ServiceService,private Toastmessage:Toastmessage) {}
 
	rightarr = [ 
		
		
		{ "rightname": "Conductor Login" },
		
	];

	ngOnInit(){    
		this.userid=localStorage.getItem("UserId");
		this.getrights(); 
		this.CheckUser();
		this.userlist();
		this.epassstate();
		this.epasscity();
		this.epasscorporation();
		this.epassarea();

		this.epassuserregisterform=this.fb.group({
			mobileno:null,
			password:'epass123',
			role:'Counter',
			email:null,
			name:null,
			rights:null,
			statecode:'',
			statename:'',
			citycode:'',
			cityname:'',
			corporationcode:'',
			corporationname:'',
			areaname:'',
			areacode:'',
			updateby:null,  
			searchstate:null,
			searchcorporation:null,
			searchcity:null,
			searcharea:null   
		}); 
		
		this.EditCounterForm=this.fb.group({
			editstate:null,
			statecode:null,
			editcity:null,
			citycode:null,
			editcorporation:null,
			editname:null,
			editmail:null,
			editmobile:null,			
			status:null ,		 
			corporationcode:null,
			editarea:null,
			areacode:null    
		});
	}

	CheckUser(){
		this.Service.epasscheckuser(this.userid).subscribe(data => {
			this.theme=data.Response[0].theme;    
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

	statelistopen(){
		this.statelistdropdown=!this.statelistdropdown;
	}

	updatestatefield(data){    
		this.statelistdropdown=false;
		this.epassuserregisterform.patchValue({
			statename:data.statename,
			citycode:'',
			cityname: '',
			statecode:data.statecode,
			corporationcode:'',
			corporationname:'',
			areaname:'',
			areacode:''
		});
	}

	corporationlist:any;	
	epasscorporation(){
    this.Service.epasscorporation()
		.subscribe(data =>{
		this.corporationlist=data.Response;  
	    
      }) 
	}

	corporationlistopen(){
		this.corporationlistdropdown=!this.corporationlistdropdown;
	}

	updatecorporationfield(data){    
		this.corporationlistdropdown=false;
		this.epassuserregisterform.patchValue({
			statename:data.statename,
			citycode:'',
			cityname: '',
			statecode:data.statecode,
			corporationname:data.corporationname,
			corporationcode:data.corporationcode,
			areaname:'',
			areacode:''
		});
	}


	citylist:any;	
	epasscity(){
    this.Service.epasscity()
		.subscribe(data =>{
		this.citylist=data.Response;  
	   
      }) 
	}

	citylistopen(){
		this.citylistdropdown=!this.citylistdropdown;
	}

	updatecityfield(data){    
		this.citylistdropdown=false;
		this.epassuserregisterform.patchValue({
			statename:data.statename,
			citycode:data.citycode,
			cityname: data.cityname,
			statecode:data.statecode,
			corporationname:data.corporationname,
			corporationcode:data.corporationcode,
			areaname:'',
			areacode:''
		});
	}

	arealist:any;	
	epassarea(){
    this.Service.epassarea()
		.subscribe(data =>{		 
		this.arealist=data.Response;  
		    
      }) 
	}

	arealistopen(){
		this.arealistdropdown=!this.arealistdropdown;
	}

	updateareafield(data){    
		this.arealistdropdown=false;
		this.epassuserregisterform.patchValue({
			statename:data.statename,
			citycode:data.citycode,
			cityname: data.cityname,
			statecode:data.statecode,
			corporationname:data.corporationname,
			corporationcode:data.corporationcode,
			areaname:data.areaname,
			areacode:data.areacode
		});
	}


	users:any;
	userlist(){
		this.Service.userlist('Counter')
			.subscribe(data =>{
			this.users = data.Response;
			
		})
	}

	rightslistarr=[];
	checkall=false;
	getrights(){
		this.rightslistarr.length=0;
		this.checkall=!this.checkall;
		if(this.checkall){
			for(var j=0;j<this.rightarr.length;j++){
				this.checkedrights.push(this.rightarr[j].rightname);	
				this.rightslistarr.push({"RightName":this.rightarr[j].rightname,"Status":this.checkall});
			}	
		}else{
			for(var j=0;j<this.rightarr.length;j++){
				this.rightslistarr.push({"RightName":this.rightarr[j].rightname,"Status":this.checkall});
			}	
			this.checkedrights.length=0;				
		}  
	} 
  
	checkedrights=[];
	getcheckedrights(event,rightarr){    
		if(event.target.checked===true){
		  this.checkedrights.push(rightarr);		 
		}else{
		  this.checkedrights = this.checkedrights.filter(item => item !== rightarr);		
		}		
	}	

	epassuserregister(){ 

	var MailPattern=/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
	var MobileNoPattern=/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;   
	 
	if(this.epassuserregisterform.value.statename!='' && this.epassuserregisterform.value.statename!=null && this.epassuserregisterform.value.statename!=undefined){
		if(this.epassuserregisterform.value.corporationname!='' && this.epassuserregisterform.value.corporationname!=null && this.epassuserregisterform.value.corporationname!=undefined){
			if(this.epassuserregisterform.value.cityname!='' && this.epassuserregisterform.value.cityname!=null && this.epassuserregisterform.value.cityname!=undefined){
				if(this.epassuserregisterform.value.areaname!='' && this.epassuserregisterform.value.areaname!=null && this.epassuserregisterform.value.areaname!=undefined){
					if(this.epassuserregisterform.value.name!='' && this.epassuserregisterform.value.name!=null && this.epassuserregisterform.value.name!=undefined){
						if(this.epassuserregisterform.value.email!='' && this.epassuserregisterform.value.email!=null && this.epassuserregisterform.value.email!=undefined){
							if((MailPattern.test(this.epassuserregisterform.value.email))==true){    if(this.epassuserregisterform.value.mobileno!='' &&
								this.epassuserregisterform.value.mobileno!=null && 
								this.epassuserregisterform.value.mobileno!=undefined){
									if((MobileNoPattern.test(this.epassuserregisterform.value.mobileno))==true){
										if(this.epassuserregisterform.value.password!='' && this.epassuserregisterform.value.password!=null && this.epassuserregisterform.value.password!=undefined){
											if(this.checkedrights.length>0){
												this.Service.epassuserregister(this.epassuserregisterform.value.mobileno,this.epassuserregisterform.value.password,this.epassuserregisterform.value.role,this.epassuserregisterform.value.email,this.epassuserregisterform.value.name,this.checkedrights,this.epassuserregisterform.value.statecode,this.epassuserregisterform.value.statename,this.epassuserregisterform.value.citycode,this.epassuserregisterform.value.cityname,this.epassuserregisterform.value.corporationcode,this.epassuserregisterform.value.corporationname,this.epassuserregisterform.value.areaname,this.epassuserregisterform.value.areacode,this.userid)
													.subscribe(data =>{
														if(data.StatusCode==200){
														  this.Toastmessage.showSuccess(data.Message);
															this.epassuserregisterform.reset();
															this.CheckUser();
															this.epassuserregisterform.patchValue({
																password:'epass123'
															});
															this.userlist();
														}else if(data.StatusCode==400){
														  this.Toastmessage.showError(data.Message)
														}              
													});
											}else{
												this.Toastmessage.showInfo('Choose atleast One Rights');
											}            
										}else{
											this.Toastmessage.showInfo('Enter the  Password!');
										}
									}else{
										this.Toastmessage.showInfo('Enter the Valid Mobile Number!');
									}
								}else{
										this.Toastmessage.showInfo('Enter the  Mobile Number!');
								}
							}else{
								this.Toastmessage.showInfo('Enter the Valid Email Address!');				  
							}
						}else{
							this.Toastmessage.showInfo('Enter the  Email Address!');
						}
					}else{
						this.Toastmessage.showInfo('Enter the  Name!');
					}		
				}else{
					this.Toastmessage.showInfo('Choose the Area Name');
				}
				
			}else{
				this.Toastmessage.showInfo('Choose the City Name');
			}
		}else{
			this.Toastmessage.showInfo('Choose the Corporation Name')
		}
	}else{
		this.Toastmessage.showInfo('Choose the State Name');
	}
	
	}

	//edituserdetails ()
EditRights=[];
SubAdminUserid:any;
edituserdetails(data){		
	
	this.EditRights.length=0;
	this.checkedrights.length=0;
	this.SubAdminUserid=data.userid;		
	this.EditCounterForm.patchValue({
		editstate:data.statename,
		editname:data.name,
		editmail:data.email,
		editmobile:data.mobileno,
		status:data.status,
		statecode:data.statecode,
		editcorporation:data.corporationname,
		corporationcode:data.corporationcode,
		editcity:data.cityname,
		citycode:data.citycode,
		editarea:data.areaname,
		areacode:data.areacode
	});
	
	var checkedrightsdb=data.rights.split(',');
	for(var j=0;j < this.rightarr.length;j++){
		this.EditRights.push({"RightName":this.rightarr[j].rightname,"Status":false});
	}
	for(var i=0;i<checkedrightsdb.length; i++){
		for(var j=0;j<this.EditRights.length;j++){
			if(checkedrightsdb[i].toLowerCase() == this.EditRights[j].RightName.toLowerCase() ){					
				this.checkedrights.push(this.EditRights[j].RightName);
				this.EditRights[j].Status=true;
			}
		}
	}
}

// Update User Rights
edituser(){
	
	if (this.EditCounterForm.value.editstate !== ('' && null) &&this.EditCounterForm.value.editcorporation !== ('' && null) &&this.EditCounterForm.value.editcity !== ('' && null) &&	this.EditCounterForm.value.editarea !== ('' && null) &&	this.EditCounterForm.value.editname !== ('' && null ) && this.checkedrights.length!=0 && this.EditCounterForm.value.editmail !== ('' && null ) && this.EditCounterForm.value.editmobile !== ('' && null ) &&  this.EditCounterForm.value.status !== ('' && null )) 		{ 

		this.Service.edituser(this.SubAdminUserid,this.EditCounterForm.value.editname,this.EditCounterForm.value.editmail,this.EditCounterForm.value.editmobile,'epass123',this.checkedrights,this.EditCounterForm.value.statecode,this.EditCounterForm.value.editstate,this.EditCounterForm.value.citycode,this.EditCounterForm.value.editcity,this.EditCounterForm.value.corporationcode,this.EditCounterForm.value.editcorporation,this.EditCounterForm.value.editarea,this.EditCounterForm.value.areacode,this.EditCounterForm.value.status)

			.subscribe(data=>{
				if(data.StatusCode === 200){
					this.Toastmessage.showSuccess(data.Message);						
					this.CheckUser();
					this.userlist();
					this.checkedrights.length=0;
					this.EditRights.length=0;
					this.EditCounterForm.patchValue({
						editstate:null,
						editcity:null,
						editcorporation:null,
						editarea:null,
						editname:null,
						editmail:null,
						editmobile:null,
						status:'Active'
					});
				}else{
					this.Toastmessage.showError(data.Message);
				}
			});
	}else{
		this.Toastmessage.showWarning('Please fill all the values.')
	}		
}








}


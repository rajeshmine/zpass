import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl,Validators} from '@angular/forms'; 

import {ServiceService } from './../../service/service.service';
import {Toastmessage} from './../../config/toaster.component'

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css'],
  providers:[ServiceService]
})

export class AppAdminLoginComponent implements OnInit{ 

	epassuserregisterform:FormGroup;
	EditAdminForm:FormGroup;
	userid:any;  
	theme='';
	statelistdropdown=false;

  constructor( public fb:FormBuilder,private Service:ServiceService,private Toastmessage:Toastmessage) {}
 
	rightarr = [ 
		
		{ "rightname": "Add Corporation" },
		{ "rightname": "Add Cities"} ,
		{ "rightname": "Add Area"},
		{ "rightname": "Add Counter"} ,
		
		{ "rightname": "Sub-Admin Login" },
		{ "rightname": "Counter Login" },
		{ "rightname": "Conductor Login" },
		{ "rightname": "Bus Service" },
		{ "rightname": "Pass Scheme" },
		{ "rightname": "Pass Type" },
		{ "rightname": "Fair Details City" },
		{ "rightname": "Fair Details Location" }
	];

	ngOnInit(){    
		this.userid=localStorage.getItem("UserId");
		this.getrights(); 
		this.CheckUser();
		this.userlist();
		this.epassstate();

		this.epassuserregisterform=this.fb.group({
			mobileno:null,
		//	password:null,
			role:'Admin',
			email:null,
			name:null,
			rights:null,
			statecode:'',
			statename:'',
			citycode:'',
			cityname:'',
			corporationcode:'',
			corporationname:'',
			place:'',
			placecode:'',
			updateby:null,  
			searchstate:null,
			password:'epass123'   
		}); 
		
		this.EditAdminForm=this.fb.group({
			editname:null,
			editmail:null,
			editmobile:null,
			editstate:null,
			status:null ,
			statecode:null    
		});
	}

	CheckUser(){
		this.Service.epasscheckuser(this.userid).subscribe(data => {
			this.theme=data.Response[0].theme;      
		});
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
			corporationname:'',
			corporationcode:'',
			place:'',
			placecode:''
		});
	}

	users:any;
	userlist(){
	this.Service.userlist('Admin')
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
		if(this.epassuserregisterform.value.name!='' && this.epassuserregisterform.value.name!=null && this.epassuserregisterform.value.name!=undefined){
			if(this.epassuserregisterform.value.email!='' && this.epassuserregisterform.value.email!=null && this.epassuserregisterform.value.email!=undefined){
				if((MailPattern.test(this.epassuserregisterform.value.email))==true){            
					if(this.epassuserregisterform.value.mobileno!='' && this.epassuserregisterform.value.mobileno!=null && this.epassuserregisterform.value.mobileno!=undefined){
						if((MobileNoPattern.test(this.epassuserregisterform.value.mobileno))==true){
							if(this.epassuserregisterform.value.password!='' && this.epassuserregisterform.value.password!=null && this.epassuserregisterform.value.password!=undefined){
								if(this.checkedrights.length>0){
									this.Service.epassuserregister(this.epassuserregisterform.value.mobileno,this.epassuserregisterform.value.password,this.epassuserregisterform.value.role,this.epassuserregisterform.value.email,this.epassuserregisterform.value.name,this.checkedrights,this.epassuserregisterform.value.statecode,this.epassuserregisterform.value.statename,this.epassuserregisterform.value.citycode,this.epassuserregisterform.value.cityname,this.epassuserregisterform.value.corporationcode,this.epassuserregisterform.value.corporationname,this.epassuserregisterform.value.place,this.epassuserregisterform.value.placecode,this.userid)
										.subscribe(data =>{
											if(data.StatusCode==200){
											  this.Toastmessage.showSuccess(data.Message);
												this.epassuserregisterform.reset();
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
		this.Toastmessage.showInfo('Choose the State Name')
	}
	
	}
	
	//edituserdetails ()
	EditRights=[];
	AdminUserid:any;
	edituserdetails(data){		
		this.EditRights.length=0;
		this.checkedrights.length=0;
		this.AdminUserid=data.userid;		
		this.EditAdminForm.patchValue({
			editstate:data.statename,
			editname:data.name,
			editmail:data.email,
			editmobile:data.mobileno,
			status:data.status,
			statecode:data.statecode
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
		if (this.EditAdminForm.value.editstate !== ('' && null) &&	this.EditAdminForm.value.editname !== ('' && null ) && this.EditAdminForm.value.editmail !== ('' && null ) && this.checkedrights.length!=0 && this.EditAdminForm.value.editmobile !== ('' && null ) && this.EditAdminForm.value.status !== ('' && null )) { 
			this.Service.edituser(this.AdminUserid,this.EditAdminForm.value.editname,this.EditAdminForm.value.editmail,this.EditAdminForm.value.editmobile,'epass123',this.checkedrights,this.EditAdminForm.value.statecode,this.EditAdminForm.value.editstate,'','','','','','',this.EditAdminForm.value.status)
				.subscribe(data=>{
					if(data.StatusCode === 200){
						this.Toastmessage.showSuccess(data.Message);						
						this.CheckUser();
						this.userlist();
						this.checkedrights.length=0;
						this.EditRights.length=0;
						this.EditAdminForm.patchValue({
							editstate:null,
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
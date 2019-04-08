
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl,Validators} from '@angular/forms'; 

import {ServiceService } from './../../service/service.service';
import {Toastmessage} from './../../config/toaster.component'

@Component({
  selector: 'app-subadminlogin',
  templateUrl: './subadminlogin.component.html',
  styleUrls: ['./subadminlogin.component.css'],
  providers:[ServiceService]
})

export class AppSubAdminComponent implements OnInit{ 

	epassuserregisterform:FormGroup;
	EditSubadminForm:FormGroup;
	userid:any;  
	theme='';
	citylistdropdown=false;
	statelistdropdown=false;
	corporationlistdropdown=false;
	role='';

  constructor( public fb:FormBuilder,private Service:ServiceService,private Toastmessage:Toastmessage) {}
 
	rightarr = [ 
		
		{ "rightname": "Add Area"},
		{ "rightname": "Add Counter"} ,
		
		
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
		this.epasscity();
		this.epasscorporation();

		this.epassuserregisterform=this.fb.group({
			mobileno:null,
			password:'epass123',
			role:'SubAdmin',
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
			searchcorporation:null   
		}); 
		
		this.EditSubadminForm=this.fb.group({
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
		if(data.role === 'Admin'){
			this.updatestatefield(data);
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
			place:'',
			placecode:''
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
			place:'',
			placecode:''
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
			place:'',
			placecode:''
		});
	}

	users:any;
	userlist(){
		this.Service.userlist('SubAdmin')
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
	this.EditSubadminForm.patchValue({
		editstate:data.statename,
		editname:data.name,
		editmail:data.email,
		editmobile:data.mobileno,
		status:data.status,
		statecode:data.statecode,
		editcorporation:data.corporationname,
		corporationcode:data.corporationcode,
		editcity:data.cityname,
		citycode:data.citycode

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
	if (this.EditSubadminForm.value.editstate !== ('' && null) &&	
		this.EditSubadminForm.value.editcorporation !== ('' && null) &&
		this.EditSubadminForm.value.editcity !== ('' && null) &&
		this.EditSubadminForm.value.editname !== ('' && null ) && this.EditSubadminForm.value.editmail !== ('' && null ) &&this.EditSubadminForm.value.editmobile !== ('' && null ) && this.checkedrights.length!=0 &&this.EditSubadminForm.value.status !== ('' && null ))
		 { 
		this.Service.edituser(this.SubAdminUserid,this.EditSubadminForm.value.editname,this.EditSubadminForm.value.editmail,this.EditSubadminForm.value.editmobile,'epass123',this.checkedrights,this.EditSubadminForm.value.statecode,this.EditSubadminForm.value.editstate,this.EditSubadminForm.value.citycode,this.EditSubadminForm.value.editcity,this.EditSubadminForm.value.corporationcode,this.EditSubadminForm.value.editcorporation,'','',this.EditSubadminForm.value.status)

			.subscribe(data=>{
				if(data.StatusCode === 200){
					this.Toastmessage.showSuccess(data.Message);						
					this.CheckUser();
					this.userlist();
					this.checkedrights.length=0;
					this.EditRights.length=0;
					this.EditSubadminForm.patchValue({
						editstate:null,
						editcity:null,
						editcorporation:null,
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
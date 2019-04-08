import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl,Validators} from '@angular/forms'; 

import {ServiceService } from './../../service/service.service';
import {Toastmessage} from './../../config/toaster.component'
import {LoggerService} from './../../logger/logger.service'
@Component({
  selector: 'app-sadminlogin',
  templateUrl: './sadminlogin.component.html',
  styleUrls: ['./sadminlogin.component.css'],
  providers:[ServiceService]
})

export class AppSAdminComponent implements OnInit{ 

  epassuserregisterform:FormGroup;
  EditSadminForm:FormGroup;
  userid:any;  
	theme='';
	EditRights=[];
	SadminUserid='';
	checkall=false;

  constructor( public fb:FormBuilder,private Service:ServiceService,private Toastmessage:Toastmessage,private LoggerService:LoggerService) {}
 
	rightarr = [ 
		
		{ "rightname": "Add States" },
		{ "rightname": "Add Corporation" },
		{ "rightname": "Add Cities"} ,
		{ "rightname": "Add Area"},
		{ "rightname": "Add Counter"} ,
		{ "rightname": "Admin Login" },
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

		this.epassuserregisterform=this.fb.group({
			mobileno:null,
			password:'epass123',
			role:'SAdmin',
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
    }); 
    

    this.EditSadminForm=this.fb.group({
      editname:null,
      editmail:null,
      editmobile:null,
      editpassword:null,
      status:'Active'     
		});
	}

	CheckUser(){
		this.Service.epasscheckuser(this.userid).subscribe(data => {
			this.theme=data.Response[0].theme;      
		});
	}

	users:any;
  userlist(){
    this.Service.userlist('SAdmin')
    .subscribe(data => {
        this.users = data.Response;
       
    })
  }

	rightslistarr=[];
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
		
		this.LoggerService.Debug(this.rightslistarr);	  
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
	}
	


	//edituserdetails ()
	edituserdetails(data){
		this.EditRights.length=0;
		this.checkedrights.length=0;
		this.SadminUserid=data.userid;
		this.LoggerService.Debug(data);
		this.EditSadminForm.patchValue({
			editname:data.name,
			editmail:data.email,
			editmobile:data.mobileno,
			status:data.status
		});
		var checkedrightsdb=data.rights.split(',');
		for(var j=0;j < this.rightarr.length;j++){
			this.EditRights.push({"RightName":this.rightarr[j].rightname,"Status":false});
		}
		for(var i=0;i<checkedrightsdb.length; i++){
			for(var j=0;j<this.EditRights.length;j++){
				if(	 checkedrightsdb[i].toLowerCase() == this.EditRights[j].RightName.toLowerCase() ){
					//this.checkedrights.push(this.EditRights[j].RightName);
					this.checkedrights.push(this.EditRights[j].RightName);
					this.EditRights[j].Status=true;
				}else{
					
				}
			}
		}
		
		this.LoggerService.Debug(data);
	}

	// Update User Rights

	edituser(){
		if(this.EditSadminForm.value.editname !== ('' && null ) && this.EditSadminForm.value.editmail !== ('' && null ) && this.EditSadminForm.value.editmobile !== ('' && null ) && this.checkedrights.length!=0 && this.EditSadminForm.value.status !== ('' && null ) ){
			this.Service.edituser(this.SadminUserid,this.EditSadminForm.value.editname,this.EditSadminForm.value.editmail,this.EditSadminForm.value.editmobile,'epass123',this.checkedrights,'','','','','','','','',this.EditSadminForm.value.status).subscribe(data=>{
				if(data.StatusCode === 200){
					this.Toastmessage.showSuccess(data.Message);
					this.LoggerService.Debug(data);
					this.CheckUser();
					this.userlist();
					this.checkedrights.length=0;
					this.EditRights.length=0;
					this.EditSadminForm.patchValue({
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
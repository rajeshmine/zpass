import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admindashboard.routing';
import { AppDashboardComponent } from './admindashboard.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ServiceService} from './../../service/service.service';

@NgModule({
  declarations: [
    AppDashboardComponent
  ], 
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [ServiceService],
  bootstrap: [ AppDashboardComponent]
})
export class AdminDashboardModule { }


 

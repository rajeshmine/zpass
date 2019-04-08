import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ServiceService} from './../service/service.service';

@NgModule({
  declarations: [
    AdminComponent
  ], 
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [ServiceService],
  bootstrap: [AdminComponent]
})
export class AppAdminModule { }

import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddcityRoutingModule } from './addcity.routing';
import { AppAddcityComponent } from './addcity.component';


import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import {ServiceService } from './../../service/service.service';
import {LoggerService } from './../../logger/logger.service';
import {AppComponent} from './../../app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [
    AppAddcityComponent
  ], 
  imports: [
    CommonModule,
    AddcityRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ],
  providers: [ServiceService,LoggerService,AppComponent],
  
 
  bootstrap: [AppAddcityComponent]
})
export class AddcityModule { }

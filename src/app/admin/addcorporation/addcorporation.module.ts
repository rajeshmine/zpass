import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddcorporationRoutingModule } from './addcorporation.routing';
import { AppAddcorporationComponent } from './addcorporation.component';


import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import {ServiceService } from './../../service/service.service';
import {LoggerService } from './../../logger/logger.service';
import {AppComponent} from './../../app.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [
    AppAddcorporationComponent
  ], 
  imports: [
    CommonModule,
    AddcorporationRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ],
  providers: [ServiceService,LoggerService,AppComponent],
  
 
  bootstrap: [AppAddcorporationComponent]
})
export class AddcorporationModule { }

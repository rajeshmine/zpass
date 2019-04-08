import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminProfileRoutingModule } from './adminprofile.routing';
import { AppProfileComponent } from './adminprofile.component';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import {HttpModule} from '@angular/http';
import {ServiceService } from './../../service/service.service';
import {LoggerService } from './../../logger/logger.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppProfileComponent
  ], 
  imports: [
    CommonModule,
    AdminProfileRoutingModule,
    HttpModule,
    FormsModule,  
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [ServiceService,LoggerService],
  bootstrap: [ AppProfileComponent]
})
export class AdminProfileModule { }


 

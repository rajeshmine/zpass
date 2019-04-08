import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AddstateRoutingModule } from './addstate.routing';
import { AppAddStateComponent } from './addstate.component';
import {HttpModule} from '@angular/http';
import {ServiceService } from './../../service/service.service';
import {LoggerService } from './../../logger/logger.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({  
  declarations: [
    AppAddStateComponent  
  ], 
  imports: [
    CommonModule,
    HttpModule,
    AddstateRoutingModule,
    FormsModule,  
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [ServiceService,LoggerService],
  bootstrap: [AppAddStateComponent]
})
export class AddstateModule { }

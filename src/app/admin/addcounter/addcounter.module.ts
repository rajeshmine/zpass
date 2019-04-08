import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AddcounterRoutingModule } from './addcounter.routing';
import { AppAddCounterComponent } from './addcounter.component';
import {HttpModule} from '@angular/http';
import {ServiceService } from './../../service/service.service';
import {LoggerService } from './../../logger/logger.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({  
  declarations: [
    AppAddCounterComponent  
  ], 
  imports: [
    CommonModule,
    HttpModule,
    AddcounterRoutingModule,
    FormsModule,  
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [ServiceService,LoggerService],
  bootstrap: [AppAddCounterComponent]
})
export class AddcounterModule { }

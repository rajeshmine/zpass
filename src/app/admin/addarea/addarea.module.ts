import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AddareaRoutingModule } from './addarea.routing';
import { AppAddAreaComponent } from './addarea.component';
import {HttpModule} from '@angular/http';
import {ServiceService } from './../../service/service.service';
import {LoggerService } from './../../logger/logger.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({  
  declarations: [
    AppAddAreaComponent  
  ], 
  imports: [
    CommonModule,
    HttpModule,
    AddareaRoutingModule,
    FormsModule,  
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [ServiceService,LoggerService],
  bootstrap: [AppAddAreaComponent]
})
export class AddareaModule { }

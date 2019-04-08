import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppCounterloginRoutingModule } from './counterlogin.routing';
import { AppCounterloginComponent } from './counterlogin.component';

@NgModule({
  declarations: [
    AppCounterloginComponent
  ], 
  imports: [
    CommonModule,
    AppCounterloginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppCounterloginComponent]
})
export class AppCounterloginModule { }

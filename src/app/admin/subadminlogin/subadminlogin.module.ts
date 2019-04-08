import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

import { AppSubAdminRoutingModule } from './subadminlogin.routing';
import { AppSubAdminComponent } from './subadminlogin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    AppSubAdminComponent
  ], 
  imports: [
    CommonModule,
    AppSubAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppSubAdminComponent]
})
export class AppSubAdminModule { }

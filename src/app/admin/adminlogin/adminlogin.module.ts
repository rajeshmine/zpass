import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

import { AppAdminLoginRoutingModule } from './adminlogin.routing';
import {AppAdminLoginComponent } from './adminlogin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    AppAdminLoginComponent
  ], 
  imports: [
    CommonModule,
    AppAdminLoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppAdminLoginComponent]
})
export class AppAdminLoginModule { }

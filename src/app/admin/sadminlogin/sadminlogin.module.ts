import { CommonModule  } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppSAdminRoutingModule } from './sadminlogin.routing';
import { AppSAdminComponent } from './sadminlogin.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'


@NgModule({
  declarations: [
    AppSAdminComponent
  ], 
  imports: [
    CommonModule,
    AppSAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppSAdminComponent]
})
export class AppSAdminModule { }

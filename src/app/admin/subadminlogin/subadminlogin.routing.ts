import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppSubAdminComponent } from './subadminlogin.component';

const routes: Routes = [
	{
		path: '',
		component: AppSubAdminComponent       
	}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AppSubAdminRoutingModule {}

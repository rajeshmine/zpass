import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppAdminLoginComponent } from './adminlogin.component';

const routes: Routes = [
	{
		path: '',
		component: AppAdminLoginComponent      
	}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AppAdminLoginRoutingModule {}

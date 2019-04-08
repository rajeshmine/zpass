import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppDashboardComponent } from './admindashboard.component';

const routes: Routes = [
	{
		path: '',
		component: AppDashboardComponent        
	}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class AdminRoutingModule {}
  
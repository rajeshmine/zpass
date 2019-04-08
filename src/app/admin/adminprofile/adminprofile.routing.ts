import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppProfileComponent } from './adminprofile.component';

const routes: Routes = [
	{
		path: '',
		component: AppProfileComponent        
	}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class AdminProfileRoutingModule {}
  
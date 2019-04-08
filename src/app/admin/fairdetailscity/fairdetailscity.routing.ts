import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppFairdetailscityComponent } from './fairdetailscity.component';

const routes: Routes = [
	{
		path: '',
		component: AppFairdetailscityComponent,

        children: [
			//{ path:'', redirectTo:'admin', pathMatch:'full'},
			//{ path: 'admin',  loadChildren: './admin/admin.module#AdminModule'  }
			
        ]
	}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AddFairdetailscityRoutingModule {}

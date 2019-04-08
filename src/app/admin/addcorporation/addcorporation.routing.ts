import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppAddcorporationComponent } from './addcorporation.component';

const routes: Routes = [
	{
		path: '',
		component: AppAddcorporationComponent,

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
export class AddcorporationRoutingModule {}

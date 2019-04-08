import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppSAdminComponent } from './sadminlogin.component';

const routes: Routes = [
	{
		path: '',
		component: AppSAdminComponent,

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
export class AppSAdminRoutingModule {}

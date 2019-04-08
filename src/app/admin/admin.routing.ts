import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [
	{
		path: '',
		component: AdminComponent,

        children: [
			{ path:'', redirectTo:'admindashboard', pathMatch:'full'},
			{ path: 'admindashboard',  loadChildren: './admindashboard/admindashboard.module#AdminDashboardModule'  },
			{ path: 'adminprofile',  loadChildren: './adminprofile/adminprofile.module#AdminProfileModule'  },
			{ path: 'sadminlogin',  loadChildren: './sadminlogin/sadminlogin.module#AppSAdminModule'  },			
			{ path: 'addcorporation',  loadChildren: './addcorporation/addcorporation.module#AddcorporationModule'  },
			{ path: 'addcity',  loadChildren: './addcity/addcity.module#AddcityModule'  },
			{ path: 'busservice',  loadChildren: './busservice/busservice.module#AddBusserviceModule'  },
			{ path: 'passscheme',  loadChildren: './passscheme/passscheme.module#AddPassschemeModule'  },
			{ path: 'passtype',  loadChildren: './passtype/passtype.module#AddPasstypeModule'  },
			{ path: 'conductorlogin',  loadChildren: './conductorlogin/conductorlogin.module#AddConductorloginModule'  },
			{ path: 'sadminlogin',  loadChildren: './sadminlogin/sadminlogin.module#AppSAdminModule'  },
			{ path: 'subadminlogin',  loadChildren: './subadminlogin/subadminlogin.module#AppSubAdminModule'  },
	 		{ path: 'counterlogin',  loadChildren: './counterlogin/counterlogin.module#AppCounterloginModule'  },
			{ path: 'adminlogin',  loadChildren: './adminlogin/adminlogin.module#AppAdminLoginModule'  },
			{ path: 'addarea',  loadChildren: './addarea/addarea.module#AddareaModule'  },
			{ path: 'addcounter',  loadChildren: './addcounter/addcounter.module#AddcounterModule'  },
			{ path: 'addstate',  loadChildren: './addstate/addstate.module#AddstateModule'  },
			{ path: 'fairdetailscity',  loadChildren: './fairdetailscity/fairdetailscity.module#AddFairdetailscityModule'  },
			{ path: 'fairdetailslocation',  loadChildren: './fairdetailslocation/fairdetailslocation.module#AddFairdetailslocationModule'  },
        ]
	}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {}
 
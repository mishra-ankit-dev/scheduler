import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const featuresRoutes: Routes = [
  {
    path: 'ae',
    loadChildren: () => import('./ae/ae.module').then((m) => m.AeModule),
  },
  {
    path: 'bp',
    loadChildren: () => import('./bp/bp.module').then((m) => m.BpModule),
  },
  {
    path: 'uipath',
    loadChildren: () =>
      import('./uipath/uipath.module').then((m) => m.UiPathModule),
  },
  {
    path: 'health',
    loadChildren: () =>
      import('./health/health.module').then((m) => m.HealthModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(featuresRoutes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}

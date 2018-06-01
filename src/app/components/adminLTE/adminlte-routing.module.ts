import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Dashboardv1Component } from './page/dashboard/dashboardv1/dashboardv1.component';
import { Dashboardv2Component } from './page/dashboard/dashboardv2/dashboardv2.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard/v1',
    component: Dashboardv1Component
  },
  {
    path: 'dashboard/v2',
    component: Dashboardv2Component
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // CommonModule
  ],
  exports: [RouterModule],
  declarations: [
    Dashboardv1Component,
    Dashboardv2Component
  ]
})
export class AdminlteRoutingModule { }

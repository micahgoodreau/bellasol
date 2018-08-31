import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UnitDetailsComponent } from './components/unit-details/unit-details.component';
import { CanReadGuard } from './core/can-read.guard';
import { AdminGuard } from './core/admin.guard';
import { AboutComponent } from './components/about/about.component';
import { ListPropertyManagersComponent } from './components/list-property-managers/list-property-managers.component';
import { SearchVehiclesComponent } from './components/search-vehicles/search-vehicles.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'unit-details/:unit', component: UnitDetailsComponent, canActivate: [CanReadGuard]},
  {path: 'unit-details', component: UnitDetailsComponent, canActivate: [CanReadGuard]},
  {path: 'search-vehicles', component: SearchVehiclesComponent, canActivate: [CanReadGuard]},
  {path: 'property-managers', component: ListPropertyManagersComponent, canActivate: [CanReadGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

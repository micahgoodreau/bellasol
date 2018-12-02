import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DataTableModule} from 'angular-6-datatable';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LeepaComponent } from './components/leepa/leepa.component';
import { UnitLeepaComponent } from './components/unit-leepa/unit-leepa.component';
import { UnitVehicleComponent } from './components/unit-vehicle/unit-vehicle.component';
import { UnitDetailsComponent } from './components/unit-details/unit-details.component';
import { UnitTenantsComponent } from './components/unit-tenants/unit-tenants.component';
import { UnitNotesComponent } from './components/unit-notes/unit-notes.component';
import { NoteFormDialogComponent } from './components/unit-details/unit-details.component';
import { UnitViolationsComponent } from './components/unit-violations/unit-violations.component';
import { VehicleViolationsComponent } from './components/vehicle-violations/vehicle-violations.component';
import { UnitPropertyManagerComponent } from './components/unit-property-manager/unit-property-manager.component';
import { AddOwnerComponent } from './components/add-owner/add-owner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatDialogModule,
  MatMenuModule,
  MatToolbarModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';
import { TenantFormDialogComponent } from './components/unit-details/unit-details.component';
import { EditTenantFormDialogComponent } from './components/unit-tenants/unit-tenants.component';
import { OwnerFormDialogComponent } from './components/unit-details/unit-details.component';
import { EditOwnerFormDialogComponent } from './components/unit-owners/unit-owners.component';
import { VehicleFormDialogComponent } from './components/unit-details/unit-details.component';
import { EditVehicleFormDialogComponent } from './components/unit-vehicle/unit-vehicle.component';
import { EditUnitFormDialogComponent } from './components/unit-info/unit-info.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CoreModule } from './core/core.module';
import { UnitOwnersComponent } from './components/unit-owners/unit-owners.component';
import { UnitInfoComponent } from './components/unit-info/unit-info.component';
import { AboutComponent } from './components/about/about.component';
import { ListPropertyManagersComponent } from './components/list-property-managers/list-property-managers.component';
import { ProprtyManagerFormDialogComponent } from './components/list-property-managers/list-property-managers.component';
import { SearchVehiclesComponent } from './components/search-vehicles/search-vehicles.component';
import { UnitSalesComponent } from './components/unit-sales/unit-sales.component';
import { ComponentslistOwnersComponent } from './componentslist-owners/componentslist-owners.component';
import { ListOwnersComponent } from './components/list-owners/list-owners.component';
import { ListOwnerFormDialogComponent } from './components/list-owners/list-owners.component';


@NgModule({
  declarations: [
    AppComponent,
    LeepaComponent,
    UnitLeepaComponent,
    UnitVehicleComponent,
    UnitDetailsComponent,
    UnitTenantsComponent,
    UnitNotesComponent,
    NoteFormDialogComponent,
    UnitViolationsComponent,
    VehicleViolationsComponent,
    UnitPropertyManagerComponent,
    AddOwnerComponent,
    TenantFormDialogComponent,
    EditTenantFormDialogComponent,
    ListOwnerFormDialogComponent,
    OwnerFormDialogComponent,
    EditOwnerFormDialogComponent,
    VehicleFormDialogComponent,
    EditVehicleFormDialogComponent,
    LoginComponent,
    NavbarComponent,
    UnitOwnersComponent,
    UnitInfoComponent,
    EditUnitFormDialogComponent,
    AboutComponent,
    ListPropertyManagersComponent,
    ProprtyManagerFormDialogComponent,
    SearchVehiclesComponent,
    UnitSalesComponent,
    ComponentslistOwnersComponent,
    ListOwnersComponent
  ],
  entryComponents: [
    TenantFormDialogComponent,
    EditTenantFormDialogComponent,
    OwnerFormDialogComponent,
    EditOwnerFormDialogComponent,
    VehicleFormDialogComponent,
    EditVehicleFormDialogComponent,
    EditUnitFormDialogComponent,
    ProprtyManagerFormDialogComponent,
    NoteFormDialogComponent,
    ListOwnerFormDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
    FontAwesomeModule,
    CoreModule,
    DataTableModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    NgbModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

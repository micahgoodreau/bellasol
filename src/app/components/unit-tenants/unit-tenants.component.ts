import { Component, Input, OnChanges, Inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Observable } from 'rxjs';
import { Tenant } from '../../tenant';
import { map } from 'rxjs/operators';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

export interface DialogData {
  tenant: Tenant;
}

@Component({
  selector: 'app-unit-tenants',
  templateUrl: './unit-tenants.component.html',
  styleUrls: ['./unit-tenants.component.scss']
})
export class UnitTenantsComponent implements OnChanges {
  @Input()
  unitNumber: String;
  tenantsCollection: AngularFirestoreCollection<Tenant>;
  public tenants: Observable<Tenant[]>;
  faTrash = faTrash;
  faPencilAlt = faPencilAlt;
  constructor(public dialog: MatDialog, private db: AngularFirestore) {}

  ngOnChanges() {
    if (this.unitNumber !== '') {
      this.tenantsCollection = this.db.collection<Tenant>('tenants', ref =>
        ref.where('UnitNumber', '==', this.unitNumber)
      );
      this.tenants = this.tenantsCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Tenant;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }
  }
  deleteTenant(id): void {
    this.db.doc('/tenants/' + id).delete();
  }
  openDialog(tenant): void {
    const dialogRef = this.dialog.open(EditTenantFormDialogComponent, {
      width: '250px',
      data: {tenant: tenant}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'app-edit-tenant-form-dialog',
  templateUrl: 'edit-tenant-form-dialog.html',
})
export class EditTenantFormDialogComponent {
  rForm: FormGroup;
  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditTenantFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.rForm = fb.group({
        'FirstName': [this.data.tenant.FirstName, Validators.required],
        'LastName': [this.data.tenant.LastName, Validators.required],
        'MobilePhone': [this.data.tenant.MobilePhone],
        'HomePhone': [this.data.tenant.HomePhone],
        'WorkPhone': [this.data.tenant.WorkPhone],
        'Email': [this.data.tenant.Email],
        'OtherEmail': [this.data.tenant.OtherEmail],
        'UnitNumber': [this.data.tenant.UnitNumber]
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    console.log(this.data.tenant.id);
    this.db.doc<Tenant>('tenants/' + this.data.tenant.id).update(this.rForm.value);
    this.dialogRef.close();
  }
}

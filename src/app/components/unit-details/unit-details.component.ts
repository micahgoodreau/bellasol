import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/auth.service';

export interface DialogData {
  unit: string;
}

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.scss']
})
export class UnitDetailsComponent implements OnInit {
  name = new FormControl('');
  rForm: FormGroup;
  unitnumber: String;
  faPlusCircle = faPlusCircle;
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private fb: FormBuilder) {
    this.rForm = fb.group({
      'animal': [null],
      'animalname': [null],
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(TenantFormDialogComponent, {
      width: '250px',
      data: {unit: this.unitnumber}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openOwnerDialog(): void {
    const dialogRef = this.dialog.open(OwnerFormDialogComponent, {
      width: '250px',
      data: {unit: this.unitnumber}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openVehicleDialog(): void {
    const dialogRef = this.dialog.open(VehicleFormDialogComponent, {
      width: '250px',
      data: {unit: this.unitnumber}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  findUnit(unitNumber) {
    this.unitnumber = unitNumber;
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('unit');
    if (id !== '') {
      this.findUnit(id);
    }
  }

}
@Component({
  selector: 'app-tenant-form-dialog',
  templateUrl: 'tenant-form-dialog.html',
})
export class TenantFormDialogComponent {
  rForm: FormGroup;
  constructor(
    private as: AuthService,
    private db: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TenantFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      console.log('tenant', this.as.userID);
      this.rForm = fb.group({
        'FirstName': [null, Validators.required],
        'LastName': [null, Validators.required],
        'HomeAddress': [null],
        'City': [null],
        'State': [null],
        'ZIPCode': [null],
        'MobilePhone': [null],
        'HomePhone': [null],
        'WorkPhone': [null],
        'Email': [null],
        'OtherEmail': [null],
        'CreatedTimeStamp': [Date.now()],
        'CreatedByID': [this.as.userID],
        'UnitNumber': [this.data.unit],
        'CreatedByDisplayName': [this.as.userDisplayName],
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    this.db.collection('tenants').add(this.rForm.value);
    this.dialogRef.close();
  }
}
@Component({
  selector: 'app-owner-form-dialog',
  templateUrl: 'owner-form-dialog.html',
})
export class OwnerFormDialogComponent {
  rForm: FormGroup;
  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OwnerFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.rForm = fb.group({
        'FirstName': [null, Validators.required],
        'LastName': [null, Validators.required],
        'HomeAddress': [null],
        'City': [null],
        'State': [null],
        'ZIPCode': [null],
        'MobilePhone': [null],
        'HomePhone': [null],
        'WorkPhone': [null],
        'Email': [null],
        'OtherEmail': [null],
        'UnitNumber': [this.data.unit]
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    this.db.collection('owners').add(this.rForm.value);
    this.dialogRef.close();
  }
}
@Component({
  selector: 'app-vehicle-form-dialog',
  templateUrl: 'vehicle-form-dialog.html',
})
export class VehicleFormDialogComponent {
  rForm: FormGroup;
  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VehicleFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.rForm = fb.group({
        'Year': [null],
        'Make': [null],
        'Model': [null],
        'Color': [null],
        'PlateNumber': [null],
        'PlateState': [null],
        'StickerNumber': [null, Validators.required],
        'FirstName': [null, Validators.required],
        'LastName': [null, Validators.required],
        'HomeAddress': [null],
        'City': [null],
        'State': [null],
        'ZIPCode': [null],
        'MobilePhone': [null],
        'HomePhone': [null],
        'WorkPhone': [null],
        'Email': [null],
        'OtherEmail': [null],
        'UnitNumber': [this.data.unit]
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    this.db.collection('vehicles').add(this.rForm.value);
    this.dialogRef.close();
  }
}

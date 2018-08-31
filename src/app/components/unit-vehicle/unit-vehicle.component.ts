import { Component, Input, OnChanges, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Vehicle } from '../../vehicle';
import { map } from 'rxjs/operators';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

export interface DialogData {
  vehicle: Vehicle;
}
@Component({
  selector: 'app-unit-vehicle',
  templateUrl: './unit-vehicle.component.html',
  styleUrls: ['./unit-vehicle.component.scss']
})
export class UnitVehicleComponent implements OnChanges {
  @Input()
  unitNumber: String;
  vehiclesCollection: AngularFirestoreCollection<Vehicle>;
  vehicles: Observable<Vehicle[]>;
  faTrash = faTrash;
  faPencilAlt = faPencilAlt;
  constructor(public dialog: MatDialog, private db: AngularFirestore) { }

  deleteVehicle(id): void {
    this.db.doc('/vehicles/' + id).delete();
  }

  openDialog(vehicle): void {
    const dialogRef = this.dialog.open(EditVehicleFormDialogComponent, {
      width: '250px',
      data: {vehicle: vehicle}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnChanges() {
    if (this.unitNumber !== '') {
      this.vehiclesCollection = this.db.collection<Vehicle>('vehicles', ref =>
        ref.where('UnitNumber', '==', this.unitNumber)
      );
      this.vehicles = this.vehiclesCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Vehicle;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
      }
  }
}
@Component({
  selector: 'app-edit-vehicle-form-dialog',
  templateUrl: 'edit-vehicle-form-dialog.html',
})
export class EditVehicleFormDialogComponent {
  rForm: FormGroup;
  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditVehicleFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.rForm = fb.group({
        'FirstName': [this.data.vehicle.FirstName, Validators.required],
        'LastName': [this.data.vehicle.LastName, Validators.required],
        'Year': [this.data.vehicle.Year],
        'Make': [this.data.vehicle.Make],
        'Model': [this.data.vehicle.Model],
        'Color': [this.data.vehicle.Color],
        'PlateNumber': [this.data.vehicle.PlateNumber],
        'PlateState': [this.data.vehicle.PlateState],
        'UnitNumber': [this.data.vehicle.UnitNumber],
        'StickerNumber': [this.data.vehicle.StickerNumber]
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    console.log(this.data.vehicle.id);
    this.db.doc<Vehicle>('vehicles/' + this.data.vehicle.id).update(this.rForm.value);
    this.dialogRef.close();
  }
}

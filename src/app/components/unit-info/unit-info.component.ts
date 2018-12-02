import { Component, Input, OnChanges, Inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Observable } from 'rxjs';
import { Unit } from '../../unit';
import { map } from 'rxjs/operators';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { PropertyManager } from '../../propertymanager';

export interface DialogData {
  unit: Unit;
}


@Component({
  selector: 'app-unit-info',
  templateUrl: './unit-info.component.html',
  styleUrls: ['./unit-info.component.scss']
})
export class UnitInfoComponent implements OnChanges {
  @Input()
  unitNumber: String;
  private itemDoc: AngularFirestoreDocument<Unit>;
  item: Observable<Unit>;
  faTrash = faTrash;
  faPencilAlt = faPencilAlt;
  constructor(public dialog: MatDialog, private db: AngularFirestore) {}

  ngOnChanges() {
    if (this.unitNumber !== '') {
        this.itemDoc = this.db.doc<Unit>('units/' + this.unitNumber);
        this.item = this.itemDoc.valueChanges();
        }
  }

  openDialog(unit): void {
    const dialogRef = this.dialog.open(EditUnitFormDialogComponent, {
      width: '470px',
      data: {unit: unit}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'app-edit-unit-form-dialog',
  templateUrl: 'edit-unit-form-dialog.html',
})
export class EditUnitFormDialogComponent {
  propertyManagerCollection: AngularFirestoreCollection<PropertyManager>;
  items: Observable<PropertyManager[]>;
  rForm: FormGroup;
  public showPMfield: boolean;
  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUnitFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.showPMfield = this.data.unit.HasPropertyManager;
      this.rForm = fb.group({
        'UnitType': [this.data.unit.UnitType, Validators.required],
        'PropertyManager': [this.data.unit.PropertyManager],
        'UnitNumber': [this.data.unit.UnitNumber],
        'HasPropertyManager': [this.data.unit.HasPropertyManager]
      });
      this.propertyManagerCollection = this.db.collection<PropertyManager>('propertyManagers');
      this.items = this.propertyManagerCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const pdata = a.payload.doc.data() as PropertyManager;
            const id = a.payload.doc.id;
            return { id, ...pdata };
          });
        })
      );
    }
    changePM(formValues): void {
      console.log('it changed', formValues.HasPropertyManager);
      this.showPMfield = formValues.HasPropertyManager;
      this.rForm.patchValue({HasPropertyManager: formValues.HasPropertyManager});
      if (!formValues.HasPropertyManager) {
      this.rForm.patchValue({PropertyManager: ''});
      }
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    // if (!this.data.unit.HasPropertyManager) {
    //   this.rForm.patchValue({PropertyManager: ''});
    // }
    this.db.doc<Unit>('units/' + this.data.unit.UnitNumber).update(this.rForm.value);
    this.dialogRef.close();
  }
}

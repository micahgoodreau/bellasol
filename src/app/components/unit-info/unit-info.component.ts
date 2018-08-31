import { Component, Input, OnChanges, Inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Observable } from 'rxjs';
import { Unit } from '../../unit';
import { map } from 'rxjs/operators';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

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
      width: '250px',
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
  rForm: FormGroup;
  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUnitFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.rForm = fb.group({
        'UnitType': [this.data.unit.UnitType, Validators.required],
        'PropertyManager': [this.data.unit.PropertyManager],
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    console.log(this.data.unit.id);
    this.db.doc<Unit>('units/' + this.data.unit.id).update(this.rForm.value);
    this.dialogRef.close();
  }
}

import { Component, Input, OnChanges, Inject } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Observable } from 'rxjs';
import { Owner } from '../../owner';
import { map } from 'rxjs/operators';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

export interface DialogData {
  owner: Owner;
}

@Component({
  selector: 'app-unit-owners',
  templateUrl: './unit-owners.component.html',
  styleUrls: ['./unit-owners.component.scss']
})
export class UnitOwnersComponent implements OnChanges {
  @Input()
  unitNumber: String;
  ownersCollection: AngularFirestoreCollection<Owner>;
  public owners: Observable<Owner[]>;
  faTrash = faTrash;
  faPencilAlt = faPencilAlt;
  constructor(public dialog: MatDialog, private db: AngularFirestore) {}

  ngOnChanges() {
    if (this.unitNumber !== '') {
      this.ownersCollection = this.db.collection<Owner>('owners', ref =>
        ref.where('UnitNumber', '==', this.unitNumber)
      );
      this.owners = this.ownersCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Owner;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }
  }
  deleteOwner(id): void {
    this.db.doc('/owners/' + id).delete();
  }
  openDialog(owner): void {
    const dialogRef = this.dialog.open(EditOwnerFormDialogComponent, {
      width: '250px',
      data: {owner: owner}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'app-edit-owner-form-dialog',
  templateUrl: 'edit-owner-form-dialog.html',
})
export class EditOwnerFormDialogComponent {
  rForm: FormGroup;
  constructor(
    private db: AngularFirestore,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditOwnerFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.rForm = fb.group({
        'FirstName': [this.data.owner.FirstName, Validators.required],
        'LastName': [this.data.owner.LastName, Validators.required],
        'MobilePhone': [this.data.owner.MobilePhone],
        'HomePhone': [this.data.owner.HomePhone],
        'WorkPhone': [this.data.owner.WorkPhone],
        'Email': [this.data.owner.Email],
        'OtherEmail': [this.data.owner.OtherEmail],
        'UnitNumber': [this.data.owner.UnitNumber]
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    console.log(this.data.owner.id);
    this.db.doc<Owner>('owners/' + this.data.owner.id).update(this.rForm.value);
    this.dialogRef.close();
  }
}

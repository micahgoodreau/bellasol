import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Owner } from '../../owner';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/auth.service';

export interface DialogData {
  id: string;
  rForm: FormGroup;
}

@Component({
  selector: 'app-list-owners',
  templateUrl: './list-owners.component.html',
  styleUrls: ['./list-owners.component.scss']
})
export class ListOwnersComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faTrash = faTrash;
  faPencilAlt = faPencilAlt;
  ownerCollection: AngularFirestoreCollection<Owner>;
  items: Observable<Owner[]>;
  items2: Owner[];
  rForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private dialog: MatDialog) {

    this.ownerCollection = this.db.collection<Owner>('owners');
  this.items = this.ownerCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Owner;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
  console.log(this.items);
  this.items2 = [{'FirstName': 'Bob', 'LastName': 'Smith', 'Email': 'bobo@bob.com', 'MobilePhone': '239-220-1234', 'UnitNumber': '1312'},
   {'FirstName': 'Fred', 'LastName': 'Jones', 'Email': 'fred@bob.com', 'MobilePhone': '239-220-7788', 'UnitNumber': '1444'}];
   }

   deleteOwner(id): void {
      this.db.doc('/owner/' + id).delete();
    }

   openDialog(): void {
    this.rForm = this.fb.group({
      'Company': [null],
      'FirstName': [null, Validators.required],
      'LastName': [null, Validators.required],
      'Address': [null],
      'City': [null],
      'State': [null],
      'ZIPCode': [null],
      'MobilePhone': [null],
      'HomePhone': [null],
      'WorkPhone': [null],
      'Email': [null],
      'OtherEmail': [null]
    });
    const dialogRef = this.dialog.open(ListOwnerFormDialogComponent, {
      width: '250px',
      data: {id: null, rForm: this.rForm}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openEditDialog(owner): void {
    this.rForm = this.fb.group({
      'Company': [owner.Company, Validators.required],
      'FirstName': [owner.FirstName, Validators.required],
      'LastName': [owner.LastName, Validators.required],
      'Address': [owner.Address],
      'City': [owner.City],
      'State': [owner.State],
      'ZIPCode': [owner.ZIPCode],
      'MobilePhone': [owner.MobilePhone],
      'HomePhone': [owner.HomePhone],
      'WorkPhone': [owner.WorkPhone],
      'Email': [owner.Email],
      'OtherEmail': [owner.OtherEmail]
    });
    const dialogRef = this.dialog.open(ListOwnerFormDialogComponent, {
      width: '250px',
      data: {id: owner.id, rForm: this.rForm}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
  }

}
@Component({
  selector: 'app-list-owner-form-dialog',
  templateUrl: 'owner-form-dialog.html',
})
export class ListOwnerFormDialogComponent {
  constructor(
    private db: AngularFirestore,
    public dialogRef: MatDialogRef<ListOwnerFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    if (this.data.id !== null) {
      this.db.doc<Owner>('owner/' + this.data.id).update(this.data.rForm.value);
    } else {
      this.db.collection('owner').add(this.data.rForm.value);
    }
    this.dialogRef.close();
  }
}


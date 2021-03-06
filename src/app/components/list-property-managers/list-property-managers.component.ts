import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PropertyManager } from '../../propertymanager';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/auth.service';

export interface DialogData {
  id: string;
  rForm: FormGroup;
}

@Component({
  selector: 'app-list-property-managers',
  templateUrl: './list-property-managers.component.html',
  styleUrls: ['./list-property-managers.component.scss']
})
export class ListPropertyManagersComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faTrash = faTrash;
  faPencilAlt = faPencilAlt;
  propertyManagerCollection: AngularFirestoreCollection<PropertyManager>;
  items: Observable<PropertyManager[]>;
  rForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private dialog: MatDialog) {

    this.propertyManagerCollection = this.db.collection<PropertyManager>('propertyManagers');
  this.items = this.propertyManagerCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as PropertyManager;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
   }

   deletePropertyManager(id): void {
      this.db.doc('/propertyManagers/' + id).delete();
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
    const dialogRef = this.dialog.open(ProprtyManagerFormDialogComponent, {
      width: '250px',
      data: {id: null, rForm: this.rForm}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openEditDialog(propertyManager): void {
    this.rForm = this.fb.group({
      'Company': [propertyManager.Company, Validators.required],
      'FirstName': [propertyManager.FirstName, Validators.required],
      'LastName': [propertyManager.LastName, Validators.required],
      'Address': [propertyManager.Address],
      'City': [propertyManager.City],
      'State': [propertyManager.State],
      'ZIPCode': [propertyManager.ZIPCode],
      'MobilePhone': [propertyManager.MobilePhone],
      'HomePhone': [propertyManager.HomePhone],
      'WorkPhone': [propertyManager.WorkPhone],
      'Email': [propertyManager.Email],
      'OtherEmail': [propertyManager.OtherEmail]
    });
    const dialogRef = this.dialog.open(ProprtyManagerFormDialogComponent, {
      width: '250px',
      data: {id: propertyManager.id, rForm: this.rForm}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit() {
  }

}
@Component({
  selector: 'app-property-manager-form-dialog',
  templateUrl: 'property-manager-form-dialog.html',
})
export class ProprtyManagerFormDialogComponent {
  constructor(
    private db: AngularFirestore,
    public dialogRef: MatDialogRef<ProprtyManagerFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    if (this.data.id !== null) {
      this.db.doc<PropertyManager>('propertyManagers/' + this.data.id).update(this.data.rForm.value);
    } else {
      this.db.collection('propertyManagers').add(this.data.rForm.value);
    }
    this.dialogRef.close();
  }
}


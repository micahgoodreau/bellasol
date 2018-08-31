import { Component, Input, OnChanges } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { UnitNote } from '../../unitnote';

@Component({
  selector: 'app-unit-notes',
  templateUrl: './unit-notes.component.html',
  styleUrls: ['./unit-notes.component.scss']
})
export class UnitNotesComponent implements OnChanges {

  @Input()
  unitNumber: String;
  notes: Observable<UnitNote[]>;
  constructor(private afs: AngularFirestore) { }

  ngOnChanges() {
    if (this.unitNumber !== '') {
      this.notes = this.afs
      .collection('unitNotes', ref => ref.where('UnitNumber', '==', this.unitNumber))
      .valueChanges();
  }
  }
}

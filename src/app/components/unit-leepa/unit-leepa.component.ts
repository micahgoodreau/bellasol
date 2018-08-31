import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { UnitLeepa } from '../../unitleepa';
@Component({
  selector: 'app-unit-leepa',
  templateUrl: './unit-leepa.component.html',
  styleUrls: ['./unit-leepa.component.scss']
})
export class UnitLeepaComponent implements OnChanges, OnInit {
  @Input()
  unitNumber: String;
  private itemDoc: AngularFirestoreDocument<UnitLeepa>;
  item: Observable<UnitLeepa>;
  constructor(public afs: AngularFirestore) {}
  update(item: UnitLeepa) {
    this.itemDoc.update(item);
  }

  ngOnChanges() {
    if (this.unitNumber !== '') {
    this.itemDoc = this.afs.doc<UnitLeepa>('leepa/' + this.unitNumber);
    this.item = this.itemDoc.valueChanges();
    }
  }
  ngOnInit() {
    this.ngOnChanges();
  }
}

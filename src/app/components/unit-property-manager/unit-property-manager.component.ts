import { Input, Component, OnChanges, OnInit } from '@angular/core';
import { PropertyManager } from '../../propertymanager';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-unit-property-manager',
  templateUrl: './unit-property-manager.component.html',
  styleUrls: ['./unit-property-manager.component.scss']
})
export class UnitPropertyManagerComponent implements OnChanges, OnInit {
  @Input()
  propertyManagerId: String;
  private itemDoc: AngularFirestoreDocument<PropertyManager>;
  item: Observable<PropertyManager>;
  constructor(private afs: AngularFirestore) { }
  update(item: PropertyManager) {
    this.itemDoc.update(item);
  }
  ngOnChanges() {
    if (this.propertyManagerId !== '') {
      this.itemDoc = this.afs.doc<PropertyManager>('propertyManagers/' + this.propertyManagerId);
      this.item = this.itemDoc.valueChanges();
      } else {
        this.item = null;
      }
}
ngOnInit() {
  this.ngOnChanges();
}
}

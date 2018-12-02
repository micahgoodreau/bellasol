import { Input, Component, OnChanges } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sales } from '../../sales';

@Component({
  selector: 'app-unit-sales',
  templateUrl: './unit-sales.component.html',
  styleUrls: ['./unit-sales.component.scss']
})
export class UnitSalesComponent implements OnChanges {

  @Input()
  unitNumber: String;
  salesCollection: AngularFirestoreCollection<Sales>;
  sales: Observable<Sales[]>;

  constructor(private afs: AngularFirestore) {}

  ngOnChanges() {
    if (this.unitNumber !== '') {
      this.salesCollection = this.afs.collection<Sales>('leepaSales', ref =>
      ref.where('unit', '==', this.unitNumber).orderBy('date', 'desc'));
      this.sales = this.salesCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Sales;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
      }
  }

}

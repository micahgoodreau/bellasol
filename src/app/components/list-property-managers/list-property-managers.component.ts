import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { PropertyManager } from '../../propertymanager';

@Component({
  selector: 'app-list-property-managers',
  templateUrl: './list-property-managers.component.html',
  styleUrls: ['./list-property-managers.component.scss']
})
export class ListPropertyManagersComponent implements OnInit {

  items: Observable<PropertyManager[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('propertyManagers').valueChanges();
   }


  ngOnInit() {
  }

}

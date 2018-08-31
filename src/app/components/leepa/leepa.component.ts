import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leepa',
  templateUrl: './leepa.component.html',
  styleUrls: ['./leepa.component.scss']
})
export class LeepaComponent implements OnInit {
  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('leepa').valueChanges();
   }

  ngOnInit() {
  }

}

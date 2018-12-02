import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/auth.service';
import { Vehicle } from '../../vehicle';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search-vehicles',
  templateUrl: './search-vehicles.component.html',
  styleUrls: ['./search-vehicles.component.scss']
})
export class SearchVehiclesComponent implements OnInit {
  plateNumber = new FormControl('');
  stickerNumber = new FormControl('');
  vehiclesCollection: AngularFirestoreCollection<Vehicle>;
  vehicles: Observable<Vehicle[]>;
  constructor(private db: AngularFirestore) { }

  findVehicle(plateNumber, stickerNumber) {
    if (plateNumber !== '') {
    this.vehiclesCollection = this.db.collection<Vehicle>('vehicles', ref =>
    ref.where('PlateNumber', '==', plateNumber));
} else {
  this.vehiclesCollection = this.db.collection<Vehicle>('vehicles', ref =>
  ref.where('StickerNumber', '==', stickerNumber));
}
  this.vehicles = this.vehiclesCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Vehicle;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
  }
  ngOnInit() {
  }

}

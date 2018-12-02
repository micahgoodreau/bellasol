import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Owner } from '../../owner';
@Component({
  selector: 'app-add-owner',
  templateUrl: './add-owner.component.html',
  styleUrls: ['./add-owner.component.scss']
})
export class AddOwnerComponent implements OnInit {
  id: string;
  rForm: FormGroup;
  post: any;                     // A property for our submitted form
  description: String = '';
  fname: String = '';
  lname: String = '';
  titleAlert: String = 'This field is required';
  newOwner: object;
  constructor(private db: AngularFirestore, private fb: FormBuilder, private route: ActivatedRoute, private location: Location) {
    this.rForm = fb.group({
      'fname': [null, Validators.required],
      'lname': [null, Validators.required],
      'address': [null],
      'city': [null],
      'state': [null],
      'zip': [null],
      'mphone': [null],
      'hphone': [null],
      'wphone': [null],
      'email': [null],
      'oemail': [null],
      'unit': [null]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  addPost(post) {
    this.fname = post.fname;
    this.newOwner = {
      UnitNumber: this.id,
      FirstName: post.fname,
      LastName: post.lname,
      HomeAddress: post.address,
      City: post.city,
      State: post.state,
      ZIPCode: post.zip,
      HomePhone: post.hphone,
      WorkPhone: post.wphone,
      MobilePhone: post.mphone,
      Email: post.email,
      OtherEmail: post.oemail
    };
    this.db.collection('tenants').add(this.newOwner);
  }
  goBack(): void {
    this.location.back();
  }
}

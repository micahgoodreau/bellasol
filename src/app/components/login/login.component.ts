import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  rForm: FormGroup;
  errorMessage: string;
  constructor(public afAuth: AuthService, private fb: FormBuilder, private router: Router) {
    this.rForm = fb.group({
      'email': [null],
      'password': [null],
    });
  }

  ngOnInit() {
  }

}

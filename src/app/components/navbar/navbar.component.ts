import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faBars = faBars;
  constructor(public afAuth: AuthService) { }

  ngOnInit() {
  }

}

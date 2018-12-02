import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  authState: any = null;
  userRef: AngularFireObject<any>;
  public isLoggedIn: boolean;
  currentUserAnonymous: string;
  public userRoles: Array<string>;
  public userID: string;
  public userDisplayName: string;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.user$.pipe(switchMap(user => {
      if (user) {
      return this.userID = user.uid;
      } else {
        return of(null);
      }
    }))
    .subscribe();

    this.user$.pipe(switchMap(user => {
      if (user) {
      return this.userDisplayName = user.displayName;
      } else {
        return of(null);
      }
    }))
    .subscribe();
  }

  get authenticated(): boolean {
    return this.isLoggedIn;
  }
  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest';
    } else if (this.currentUserAnonymous) {
      return 'Anonymous';
    } else {
      return this.authState['displayName'] || 'User without a Name';
    }
  }

  emailLogin(formValues) {
    console.log('login w/ email');
    return this.afAuth.auth
      .signInWithEmailAndPassword(formValues.email, formValues.password)
      .then(credential => {
        this.updateUserData2(credential.user);
      })
      .catch(error => console.log(error));
  }
  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
  private updateUserData2(user) {
    console.log('user data2:', user.uid);
    this.userID = user.uid;
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      // displayName: user.displayName,
      photoURL: user.photoURL,
      roles: { subscriber: true, admin: true }
    };
    return userRef.ref.set(data, { merge: true });
  }
  logout() {
    this.afAuth.auth.signOut().then(() => {
      console.log('you have been logged out!');
      this.router.navigate(['login']);
    });
  }
  isAuthenticated() {
    return this.authState; // user.map(user => user && user.uid !== undefined);
  }
  ///// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }
}

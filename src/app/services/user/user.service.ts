import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { distinctUntilChanged, first, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private basePath = '/users';

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase) {}

  login(credentials: any) {
    return this.auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }

  register(user: any) {
    return this.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((credentials) => {
        credentials.user?.updateProfile({
          displayName: `${user.first_name} ${user.last_name}`,
        });

        if (credentials.user?.uid) {
          this.setUserDetails(credentials.user?.uid, { role: user.role });
        }
      });
  }

  setUserDetails(user_uid: string, details: any) {
    return this.db.list(`${this.basePath}/${user_uid}`).push(details);
  }

  getUserDetails(user_uid: string) {
    return this.db.list(`${this.basePath}/${user_uid}`).valueChanges();
  }

  getUserRole(): Observable<string> {
    return this.auth.user.pipe(
      distinctUntilChanged(),
      switchMap((user: any) => this.getUserDetails(user?.uid)),
      map(([details]: any) => details?.role)
    );
  }
}

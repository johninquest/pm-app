import { Injectable } from '@angular/core'; 
import {
  Auth,
  authState,
  user,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // constructor() { } 

  constructor(private _fbAuth: Auth) {}

  logUserIn(userId: string, userPassword: string) {
    return signInWithEmailAndPassword(this._fbAuth, userId, userPassword);
  }

  logUserOut() {
    return signOut(this._fbAuth);
  }

  checkAuthState() {
    return authState(this._fbAuth);
  }

  currentlyLoggedUser() {
    return user(this._fbAuth);
  }

  facebookAuth() {
    let _authResponse = signInWithPopup(
      this._fbAuth,
      new FacebookAuthProvider()
    );
    return _authResponse;
  }

  googleAuth() {
    let _authResponse = signInWithPopup(this._fbAuth, new GoogleAuthProvider());
    return _authResponse;
  }
}

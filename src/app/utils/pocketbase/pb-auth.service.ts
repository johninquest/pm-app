import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class PbAuthService {

  private pb: PocketBase;
  private authStore = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<any>(null);

  constructor(private router: Router) {
    this.pb = new PocketBase('https://api.johnapps.de/v1');

    // Initialize auth state from PocketBase
    this.authStore.next(this.pb.authStore.isValid);
    this.currentUser.next(this.pb.authStore.model);

    // Listen to PocketBase auth state changes
    this.pb.authStore.onChange(() => {
      this.authStore.next(this.pb.authStore.isValid);
      this.currentUser.next(this.pb.authStore.model);
    });
  }

  async login(email: string, password: string) {
    try {
      const authData = await this.pb.collection('users').authWithPassword(email, password);
      this.router.navigate(['/home']);
      return authData;
    } catch (err: any) {  // Type as 'any' since PocketBase error structure might vary
      throw new Error(`Login failed: ${err?.message || 'Unknown error'}`);
    }
  }

  async register(email: string, password: string, passwordConfirm: string) {
    try {
      const userData = {
        email,
        password,
        passwordConfirm,
      };
      await this.pb.collection('users').create(userData);
      // Automatically log in after successful registration
      return this.login(email, password);
    } catch (err: any) {  // Type as 'any' since PocketBase error structure might vary
      throw new Error(`Registration failed: ${err?.message || 'Unknown error'}`);
    }
  }

  async loginWithGoogle() {
    try {
      const authData = await this.pb.collection('users').authWithOAuth2({
        provider: 'google'
      });

      if (authData) {
        this.router.navigate(['/home']);
      }
      return authData;
    } catch (err: any) {
      throw new Error(`Google authentication failed: ${err?.message || 'Unknown error'}`);
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStore.asObservable();
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  logout(): void {
    this.pb.authStore.clear();
    this.router.navigate(['/auth']);
  }
}

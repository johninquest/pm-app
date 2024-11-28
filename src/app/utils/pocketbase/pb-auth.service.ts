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

  getPocketBase(): PocketBase {
    return this.pb;
  }

  getToken(): string {
    return this.pb.authStore.token;
  }

  async isTokenValid(): Promise<boolean> {
    return await this.pb.authStore.isValid;
  }

  async refreshAuth(): Promise<void> {
    if (this.pb.authStore.isValid) {
      try {
        await this.pb.collection('users').authRefresh();
      } catch (err) {
        this.logout();
        throw new Error('Session expired. Please login again.');
      }
    }
  }

  async refreshUserProfile() {
    if (!this.pb.authStore.model?.['id']) return null;
    
    try {
      const user = await this.pb.collection('users').getOne(this.pb.authStore.model?.['id']);
      this.currentUser.next(user);
      return user;
    } catch (err) {
      console.error('Failed to refresh user profile:', err);
      return null;
    }
  }

  async updateProfile(userId: string, data: any) {
    try {
      const updatedUser = await this.pb.collection('users').update(userId, data);
      this.currentUser.next(updatedUser);
      return updatedUser;
    } catch (err: any) {
      throw new Error(`Failed to update profile: ${err?.message || 'Unknown error'}`);
    }
  }

  async login(email: string, password: string) {
    try {
      const authData = await this.pb.collection('users').authWithPassword(email, password);
      this.router.navigate(['/home']);
      return authData;
    } catch (err: any) {
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
      return this.login(email, password);
    } catch (err: any) {
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

  async getCurrentUserAsync() {
    return this.pb.authStore.model;
  }

  logout(): void {
    this.pb.authStore.clear();
    this.router.navigate(['/auth']);
  }
}
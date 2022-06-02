import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import firebase from 'firebase/compat';
import { BehaviorSubject } from 'rxjs';

const STORAGE_KEY = 'litvinenko-test-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly firebase: FirebaseService) {
    this.getFromStorage();
  }

  public isLogin: boolean = false;

  private user$ = new BehaviorSubject<firebase.User | null>(null);

  public get user(): firebase.User {
    return this.user$.value as firebase.User;
  }

  public async login(email: string, password: string): Promise<boolean> {
    const result = await this.firebase.login(email, password);
    console.log(result);
    if (result !== null) {
      this.setToStorage(result.user as firebase.User);
      this.isLogin = true;
      return true;
    }
    else {
      return false;
    }
  }

  public logout(): void {
    this.isLogin = false;
    localStorage.removeItem(STORAGE_KEY);
    this.user$.next(null);
  }

  private setToStorage(user: firebase.User): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.user$.next(user);
  }

  private getFromStorage(): void {
    const userString = localStorage.getItem(STORAGE_KEY)
    if (userString !== null && userString !== '') {
      this.user$.next(JSON.parse(userString));
      this.isLogin = true;
      console.log(JSON.parse(userString));
    }
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  authChanged: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private userService: UserService) {}

  login(name: string, password: string): boolean {
    const user = this.userService.getUserByName(name);
    if (user && user.password === password) {
      this.userService.setCurrentUser(user);
      this.isLoggedIn = true;
      this.authChanged.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.userService.logoutCurrentUser();
    this.isLoggedIn = false;
    this.authChanged.next(false);
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  getCurrentUser(): User | null {
    return this.userService.getCurrentUser();
  }

 /* saveTestResult(userName: string, testResult: { testId: number, lastStep: string }): void {
    this.userService.saveTestResult(userName, testResult);
  }*/
}

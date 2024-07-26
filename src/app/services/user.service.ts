import { Injectable } from '@angular/core';
import { User, TestResult } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { TestService } from "./test.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localStorageKey = 'users';
  private sessionStorageKey = 'currentUser';

  constructor() { }

  // Робота з користувачами
  getUsers(): User[] {
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }

  saveUsers(users: User[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    this.saveUsers(users);
  }

  getUserByName(name: string): User | undefined {
    const users = this.getUsers();
    return users.find(user => user.name === name);
  }

  isUserNameUnique(name: string): boolean {
    const user = this.getUserByName(name);
    return !user;
  }

  // Робота з поточним користувачем
  setCurrentUser(user: User): void {
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const user = sessionStorage.getItem(this.sessionStorageKey);
    return user ? JSON.parse(user) : null;
  }

  logoutCurrentUser(): void {
    sessionStorage.removeItem(this.sessionStorageKey);
  }



  saveTestResult(userName: string, testResult: TestResult): void {

    const currentUser = this.getUserByName(userName);

    if (currentUser) {
      if (!currentUser.testResults) {
        currentUser.testResults = [];
      }

      const existingResultIndex = currentUser.testResults.findIndex(result => result.testId === testResult.testId);

      if (existingResultIndex !== -1) {
        currentUser.testResults[existingResultIndex] = testResult;
      } else {
        currentUser.testResults.push(testResult);
      }

      this.saveUsers(this.getUsers().map(user => user.name === userName ? currentUser : user));
    }

  }


}

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.authChanged.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      this.currentUser = this.authService.getCurrentUser();
    });

    this.isLoggedIn = this.authService.getIsLoggedIn();
    this.currentUser = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.currentUser = null;
  }
}

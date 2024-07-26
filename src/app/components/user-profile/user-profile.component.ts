import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router, RouterModule} from '@angular/router';
import { User, TestResult } from '../../models/user.model';
import {CommonModule} from "@angular/common";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  standalone: true,
  styleUrls: ['./user-profile.component.scss'],
  imports: [CommonModule, RouterModule],
  providers: [UserService, AuthService],

})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  userResults: { testId: number; lastStep: number }[] = [];
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = this.userService.getUserByName(currentUser.name) || null;
      if (currentUser) {
        this.userResults = currentUser.testResults || [];
      }
    }
  }

  navigateToTest(testId: number): void {
    this.router.navigate(['/test-runner'], { queryParams: { testId } });
  }
}

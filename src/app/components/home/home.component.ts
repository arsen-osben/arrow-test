import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService, Test } from '../../services/test.service';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  tests: Test[] = [];

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit(): void {
    this.tests = this.testService.getTests();
  }

  navigateToTest(testId: number): void {
    this.router.navigate(['/test-runner'], { queryParams: { testId } });
  }
}

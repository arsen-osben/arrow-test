import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService, Test } from '../../services/test.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tests: Test[] = [];
  sortBy: 'date' | 'name' | 'questions' = 'date'; // поточний критерій сортування
  sortOrder: 'asc' | 'desc' = 'asc'; // поточний порядок сортування

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit(): void {
    this.loadTests();
  }

  loadTests(): void {
    this.tests = this.testService.getTests();
    this.sortTests(this.sortBy); // Сортування при завантаженні тестів
  }

  navigateToTest(testId: number): void {
    this.router.navigate(['/test-runner'], { queryParams: { testId } });
  }

  sortTests(criteria: 'date' | 'name' | 'questions'): void {
    if (this.sortBy === criteria) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = criteria;
      this.sortOrder = 'asc';
    }

    const modifier = this.sortOrder === 'asc' ? 1 : -1;

    switch (criteria) {
      case 'date':
        this.tests.sort((a, b) => (new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()) * modifier);
        break;
      case 'name':
        this.tests.sort((a, b) => a.name.localeCompare(b.name) * modifier);
        break;
      case 'questions':
        this.tests.sort((a, b) => (a.questions.length - b.questions.length) * modifier);
        break;
    }
  }
}

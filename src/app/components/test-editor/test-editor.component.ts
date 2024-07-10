import { Component, OnInit } from '@angular/core';
import { TestService, Test } from '../../services/test.service';
import { Router } from '@angular/router';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-test-editor',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './test-editor.component.html',
  styleUrl: './test-editor.component.scss'
})
export class TestEditorComponent implements OnInit {
  allTests: Test[] = [];
  newTestId: string = '';
  newTestName: string = '';

  constructor(private testService: TestService, private router: Router) {}

  ngOnInit(): void {
    this.loadTests();
  }

  loadTests(): void {
    this.allTests = this.testService.getTests();
  }

  editTest(id: number): void {
    this.router.navigate(['/edit-test-single', id]);
  }

  removeTest(id: number): void {
    const confirmation = confirm('Ви впевнені, що хочете видалити цей тест?');
    if (confirmation) {
      this.testService.deleteTest(id);
      this.loadTests();
    }
  }

  gotoAddTest(): void {
    this.router.navigate(['/edit-test-single', 'new']);
  }
}

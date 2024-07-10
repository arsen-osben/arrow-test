import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService, Question, Test } from '../../services/test.service';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-test-runner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-runner.component.html',
  styleUrl: './test-runner.component.scss'
})
export class TestRunnerComponent implements OnInit {
  test: Test | undefined;
  currentQuestion: Question | undefined;
  currentQuestionIndex: number = 0;

  constructor(
    private testService: TestService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const testId = Number(params['testId']);
      this.test = this.testService.getTestById(testId);
      if (this.test) {
        this.currentQuestion = this.test.questions[this.currentQuestionIndex];
      }
    });
  }

  answerQuestion(nextQuestionId: number): void {
    if (nextQuestionId === 0) {
      // Тест завершено
      this.currentQuestion = undefined;
    } else {
      this.currentQuestion = this.test?.questions.find(q => q.id === nextQuestionId);
    }
  }
}

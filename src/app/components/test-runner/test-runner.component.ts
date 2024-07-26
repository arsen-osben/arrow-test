import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService, Question, Test } from '../../services/test.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ReplaceStarWithSpacePipe } from '../../pipes/replace-star-with-space.pipe';

@Component({
  selector: 'app-test-runner',
  templateUrl: './test-runner.component.html',
  standalone: true,
  styleUrls: ['./test-runner.component.scss'],
  imports: [CommonModule, ReplaceStarWithSpacePipe]
})
export class TestRunnerComponent implements OnInit {
  test: Test | undefined;
  currentQuestion: Question | undefined;
  currentQuestionIndex: number = 0;

  constructor(
    private testService: TestService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const testId = Number(params['testId']);
      this.test = this.testService.getTestById(testId);
      if (this.test && this.test.questions.length > 0) {
        this.currentQuestion = this.test.questions[this.currentQuestionIndex];
      } else {
        this.currentQuestion = undefined;
      }
    });
  }

  answerQuestion(nextQuestionId: number): void {
    // Знайти наступне питання
    const nextQuestion = this.test?.questions.find((q: Question) => q.id === nextQuestionId);

    // Перевірка, чи є наступне питання кінцевим
    if (nextQuestion?.isEnd) {
      // Тест завершено, зберегти результат та відобразити кінцеве питання
      if (this.test && this.currentQuestion) {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          const testResult = {
            testId: this.test.id,
            lastStep: nextQuestion.id // Зберігаємо ID останнього питання
          };
          this.userService.saveTestResult(currentUser.name, testResult);
        }
      }
      // Встановити кінцеве питання як поточне
      this.currentQuestion = nextQuestion;
    } else {
      // В іншому випадку, перейти до наступного питання
      this.currentQuestion = nextQuestion;
    }
  }

}

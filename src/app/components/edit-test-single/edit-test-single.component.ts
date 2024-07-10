import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TestService, Test} from '../../services/test.service';
import {FormBuilder, FormGroup, Validators, FormArray, AbstractControl} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-test-single',
  templateUrl: './edit-test-single.component.html',
  styleUrls: ['./edit-test-single.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class EditTestSingleComponent implements OnInit {
  editForm: FormGroup;
  test: Test = {id: 0, name: '', questions: []};
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      testId: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')]],
      testName: ['', [Validators.required, Validators.minLength(1)]],
      questions: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const testId = this.route.snapshot.paramMap.get('id');
    if (testId !== 'new') {
      const id = parseInt(testId!, 10);
      const existingTest = this.testService.getTestById(id);
      if (existingTest) {
        this.test = {...existingTest};

        // Populate form with existing test data
        this.editForm.patchValue({
          testId: this.test.id,
          testName: this.test.name
        });

        const questionForms = this.test.questions.map(question => this.fb.group({
          questionId: [question.id, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')]],
          questionText: [question.question, [Validators.required, Validators.minLength(1)]],
          isEnd: [question.isEnd],
          answers: this.fb.array(
            question.answers.map(answer => this.fb.group({
              text: [answer.text, Validators.required],
              nextQuestionId: [answer.nextQuestionId, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')]]
            }))
          )
        }));

        const questionFormArray = this.fb.array(questionForms);
        this.editForm.setControl('questions', questionFormArray);
      }
    }
  }

  saveTest(): void {

    if (this.editForm.invalid) {
      this.errorMessage = 'Перевірте форму на наявність помилок.';
      return;
    }

    const editedTest: Test = {
      id: parseInt(this.editForm.value.testId, 10),
      name: this.editForm.value.testName,
      questions: this.editForm.value.questions.map((question: any) => ({
        id: parseInt(question.questionId, 10),
        question: question.questionText,
        isEnd: question.isEnd,
        answers: question.answers.map((answer: any) => ({
          text: answer.text,
          nextQuestionId: parseInt(answer.nextQuestionId, 10)
        }))
      }))
    };

    const isCreatingNewTest = this.route.snapshot.paramMap.get('id') === 'new';
    if (!isCreatingNewTest) {
      // Update existing test
      this.testService.updateTest(editedTest);
    } else {
      // Check if test already exists
      const existingTest = this.testService.getTestById(editedTest.id);
      if (existingTest) {
        this.errorMessage = `Тест з ID ${editedTest.id} вже існує. Виберіть інший ID.`;
        return;
      }
      // Add new test
      this.testService.addTest(editedTest);
    }

    this.router.navigate(['/test-editor']);
  }


  cancel(): void {
    this.router.navigate(['/test-editor']);
  }


  addQuestion(questionData: any = {questionId: '', questionText: '', answers: []}): void {
    const questionGroup = this.fb.group({
      questionId: [questionData.questionId, [Validators.required, Validators.pattern('^[0-9]+$')]],
      questionText: [questionData.questionText, [Validators.required, Validators.minLength(3)]],
      answers: this.fb.array([])
    });

    const answersArray = questionGroup.get('answers') as FormArray;
    questionData.answers.forEach((answer: any) => {
      answersArray.push(this.fb.group({
        text: [answer.text, Validators.required],
        nextQuestionId: [answer.nextQuestionId, [Validators.required, Validators.pattern('^[0-9]+$')]]
      }));
    });

    this.questions.push(questionGroup);
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  addAnswer(questionIndex: number): void {
    const answersArray = this.getAnswers(questionIndex);
    answersArray.push(this.fb.group({
      text: ['', Validators.required],
      nextQuestionId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    }));
  }

  removeAnswer(questionIndex: number, answerIndex: number): void {
    const answersArray = this.getAnswers(questionIndex);
    if (answersArray && answersArray.length > answerIndex) {
      answersArray.removeAt(answerIndex);
    }
  }

  get questions(): FormArray {
    return this.editForm.get('questions') as FormArray;
  }

  getAnswers(questionIndex: number): FormArray {
    const question = this.questions.at(questionIndex) as FormGroup;
    return question.get('answers') as FormArray;
  }
}

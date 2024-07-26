import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';

export interface Answer {
  text: string;
  nextQuestionId: number;
}

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
  isEnd: boolean;
}

export interface Test {
  id: number;
  name: string;
  questions: Question[];
  creationDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private tests: Test[] = [];

  /*private tests: Test[] = [
    {
      id: 1,
      name: 'З якої мови програмування почати?',
      questions: [
        {
          id: 1,
          question: 'Чому ви хочете вивчити програмування?',
          answers: [
            {text: 'Я - дитина/підліток, цікаво спробувати', nextQuestionId: 2},
            {text: 'Заробляти грошенята', nextQuestionId: 3},
            {text: 'Для саморозвитку, хочу стати краще', nextQuestionId: 4},
            {text: 'Цікаво / Просто так / Не знаю', nextQuestionId: 4},
          ],
          isEnd: false
        },
        {
          id: 2,
          question: 'Спочатку Scratch, після Python',
          answers: [],
          isEnd: true
        },
        {
          id: 3,
          question: 'Який напрям роботи вам цікавий?',
          answers: [
            {text: 'Data Science', nextQuestionId: 4},
            {text: 'Великі tech-компанії', nextQuestionId: 5},
            {text: '3D / gamedev', nextQuestionId: 6},
            {text: 'Не важливо, головне побільше $$$', nextQuestionId: 7},
            {text: 'Вибір платформи (Web, Mobile, Application)', nextQuestionId: 8},
          ],
          isEnd: false
        },
        {
          id: 4,
          question: 'R — мова програмування і програмне середовище для статистичних обчислень, аналізу та зображення даних в графічному вигляді. + Python',
          answers: [],
          isEnd: true
        },
        {
          id: 5,
          question: 'Java + C++',
          answers: [],
          isEnd: true
        },
        {
          id: 6,
          question: 'C#',
          answers: [],
          isEnd: true
        },
        {
          id: 7,
          question: 'Java',
          answers: [],
          isEnd: true
        },
        {
          id: 8,
          question: 'Яка платформа вам до вподоби?',
          answers: [
            {text: '', nextQuestionId: 2},
            {text: '', nextQuestionId: 3},
            {text: '', nextQuestionId: 4},
            {text: '', nextQuestionId: 4},
          ],
          isEnd: false
        },
      ]
    },
  ];*/

  constructor(private storageService: StorageService) {
    this.loadTests();
  }

  private loadTests(): void {
    const savedTests = this.storageService.getData('tests');

    if (savedTests) {
      this.tests = savedTests;
    } else this.tests = [
      {
        id: 1,
        name: 'З якої мови програмування почати?',
        questions: [
          {
            id: 1,
            question: 'Чому*ви*хочете*вивчити*програмування?',
            answers: [
              {text: 'Я - дитина/підліток, цікаво спробувати', nextQuestionId: 2},
              {text: 'Заробляти грошенята', nextQuestionId: 3},
              {text: 'Для саморозвитку, хочу стати краще', nextQuestionId: 4},
              {text: 'Цікаво / Просто так / Не знаю', nextQuestionId: 19},
            ],
            isEnd: false
          },
          {
            id: 2,
            question: 'Спочатку Scratch, після Python',
            answers: [],
            isEnd: true
          },
          {
            id: 3,
            question: 'Який напрям роботи вам цікавий?',
            answers: [
              {text: 'Data Science', nextQuestionId: 4},
              {text: 'Великі tech-компанії', nextQuestionId: 5},
              {text: '3D / gamedev', nextQuestionId: 6},
              {text: 'Не важливо, головне побільше $$$', nextQuestionId: 7},
              {text: 'Вибір платформи (Web, Mobile, Application)', nextQuestionId: 8},
            ],
            isEnd: false
          },
          {
            id: 4,
            question: 'R — мова програмування і програмне середовище для статистичних обчислень, аналізу та зображення даних в графічному вигляді. + Python',
            answers: [],
            isEnd: true
          },
          {
            id: 5,
            question: 'Java + C++',
            answers: [],
            isEnd: true
          },
          {
            id: 6,
            question: 'C#',
            answers: [],
            isEnd: true
          },
          {
            id: 7,
            question: 'Java',
            answers: [],
            isEnd: true
          },
          {
            id: 8,
            question: 'Яка платформа вам до вподоби?',
            answers: [
              {text: 'Web', nextQuestionId: 9},
              {text: 'Mobile', nextQuestionId: 10},
              {text: 'Application', nextQuestionId: 11},
            ],
            isEnd: false
          },
          {
            id: 9,
            question: 'Що більше подобаєтсья ?',
            answers: [
              {text: 'BackEnd (сервер, логіка)', nextQuestionId: 12},
              {text: 'FrontEnd (браузер, інтерфейс)', nextQuestionId: 13},
            ],
            isEnd: false
          },
          {
            id: 10,
            question: 'Яка мобільна ОС цікавить ?',
            answers: [
              {text: 'iOS', nextQuestionId: 14},
              {text: 'Android', nextQuestionId: 7},
            ],
            isEnd: false
          },
          {
            id: 11,
            question: 'Чи має додаток працювати в режимі реального часу (як twitter) ?',
            answers: [
              {text: 'Так', nextQuestionId: 13},
              {text: 'Ні', nextQuestionId: 12},
            ],
            isEnd: false
          },
          {
            id: 12,
            question: 'Хочете спробувати щось нове з величезним потенціалом ?',
            answers: [
              {text: 'Так', nextQuestionId: 13},
              {text: 'Ні', nextQuestionId: 15},
              {text: 'Не знаю', nextQuestionId: 15},
            ],
            isEnd: false
          },
          {
            id: 13,
            question: 'JavaScript - основа основ web',
            answers: [],
            isEnd: true
          },
          {
            id: 14,
            question: 'Swift + JavaScript',
            answers: [],
            isEnd: true
          },
          {
            id: 15,
            question: 'Яку іграшку обираєте ?',
            answers: [
              {text: 'Пісочниця', nextQuestionId: 16},
              {text: 'Lego', nextQuestionId: 17},
              {text: 'Стару і страшну, але мою улюблену', nextQuestionId: 18},
            ],
            isEnd: false
          },
          {
            id: 16,
            question: 'Python',
            answers: [],
            isEnd: true
          },
          {
            id: 17,
            question: 'Go',
            answers: [],
            isEnd: true
          },
          {
            id: 18,
            question: 'PHP',
            answers: [],
            isEnd: true
          },
          {
            id: 19,
            question: 'Маєте ідею для реалізації ?',
            answers: [
              {text: 'Так', nextQuestionId: 8},
              {text: 'Нема, але хочу почати кодити одразу', nextQuestionId: 20},
            ],
            isEnd: false
          },
          {
            id: 20,
            question: 'Яким шляхом підемо ?',
            answers: [
              {text: 'Найлегшим', nextQuestionId: 16},
              {text: 'Найкращим', nextQuestionId: 16},
              {text: 'Важчим', nextQuestionId: 21},
              {text: 'Самим важчим із можливих (потім буде все простіше)', nextQuestionId: 22},
            ],
            isEnd: false
          },
          {
            id: 21,
            question: 'Яке авто вибираєте для себе ?',
            answers: [
              {text: 'Автоперемикач швидкості', nextQuestionId: 7},
              {text: 'Ручна механіка', nextQuestionId: 23},
            ],
            isEnd: false
          },
          {
            id: 22,
            question: 'С++',
            answers: [],
            isEnd: true
          },
          {
            id: 23,
            question: 'С (без плюсів)',
            answers: [],
            isEnd: true
          },
        ],
        creationDate: '2024-07-21T09:45:43.081Z'
      },
      {
        id: 2,
        name: 'Йти гуляти чи ні?',
        questions: [
          {
            id: 1,
            question: 'На*вулиці*сонячно?',
            answers: [
              {text: 'Так', nextQuestionId: 2},
              {text: 'Ні', nextQuestionId: 3},
            ],
            isEnd: false
          },
          {
            id: 2,
            question: 'За вікном тепло?',
            answers: [
              {text: 'Так', nextQuestionId: 4},
              {text: 'Ні', nextQuestionId: 5},
            ],
            isEnd: false
          },

          {
            id: 4,
            question: 'Бігом на вулицю',
            answers: [],
            isEnd: true
          },
          {
            id: 3,
            question: 'Йде дощ/ливень/завірюха/торнадо/смерч ?',
            answers: [
              {text: 'Так', nextQuestionId: 5},
              {text: 'Ні', nextQuestionId: 4},
            ],
            isEnd: false
          },
          {
            id: 5,
            question: 'Краще залишитись вдома',
            answers: [],
            isEnd: true
          },
        ],
        creationDate: '2024-07-23T09:45:43.081Z'
      },
      {
        id: 3,
        name: 'Видати кредит чи відмовити?',
        questions: [
          {
            id: 1,
            question: 'Вік замовника більше 40 років?',
            answers: [
              {text: 'Так', nextQuestionId: 2},
              {text: 'Ні', nextQuestionId: 3},
            ],
            isEnd: false
          },
          {
            id: 2,
            question: 'Ціль кредитування?',
            answers: [
              {text: 'Відкриття бізнесу', nextQuestionId: 4},
              {text: 'Споживчі витрати', nextQuestionId: 5},
            ],
            isEnd: false
          },

          {
            id: 5,
            question: 'Видати кредит',
            answers: [],
            isEnd: true
          },
          {
            id: 4,
            question: 'Є бізнем-план?',
            answers: [
              {text: 'Так', nextQuestionId: 5},
              {text: 'Ні', nextQuestionId: 6},
            ],
            isEnd: false
          },
          {
            id: 6,
            question: 'Відмовити у видачі',
            answers: [],
            isEnd: true
          },
          {
            id: 3,
            question: 'Відмінна кредитна історія?',
            answers: [
              {text: 'Так', nextQuestionId: 5},
              {text: 'Ні', nextQuestionId: 7},
            ],
            isEnd: false
          },
          {
            id: 7,
            question: 'Є майно під заставу?',
            answers: [
              {text: 'Так', nextQuestionId: 5},
              {text: 'Ні', nextQuestionId: 6},
            ],
            isEnd: false
          },
        ],
        creationDate: '2024-07-25T09:45:43.081Z'
      },
    ];
  }


  getTests(): Test[] {
    return this.tests;
  }

  getTestById(id: number): Test | undefined {
    return this.tests.find(t => t.id === id);
  }

  saveTests(): void {
    this.storageService.saveData('tests', this.tests);
  }

  addTest(test: Test): void {
    this.tests.push(test);
    this.saveTests();
  }

  updateTest(updatedTest: Test): void {
    const updatedTestId = typeof updatedTest.id === 'string' ? parseInt(updatedTest.id, 10) : updatedTest.id;
    const index = this.tests.findIndex(t => t.id === updatedTest.id);
    console.log(updatedTestId)

    if (index !== -1) {
      this.tests[index] = updatedTest;
      this.saveTests();
    } else {
      console.log('Test with ID', updatedTest.id, 'not found.');
    }
  }

  deleteTest(id: number): void {
    this.tests = this.tests.filter(test => test.id !== id);
    this.saveTests();
  }


}

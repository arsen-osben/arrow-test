import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService, Question } from '../../services/test.service';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {
  testId: number = 0;
  questions: Question[] = [];

  constructor(private route: ActivatedRoute, private testService: TestService) {}

  ngOnInit(): void {
    this.testId = Number(this.route.snapshot.paramMap.get('id'));
    const test = this.testService.getTestById(this.testId);
    if (test) {
      this.questions = test.questions;
    }
  }
}

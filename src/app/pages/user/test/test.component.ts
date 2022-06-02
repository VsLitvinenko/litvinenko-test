import {Component, OnInit} from '@angular/core';
import {Question, Test} from 'src/app/interfaces/test.interfaces';
import {FirebaseService} from '../../../services/firebase.service';
import {isArray} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  public loadCounter = 0;
  public title = '';

  public questions: Question[] = [];
  public userAnswers: any[] = []

  public userRes: boolean[] = []

  constructor(private readonly firebase: FirebaseService) { }

  async ngOnInit(): Promise<void> {
    this.loadCounter += 1;

    const test = await this.firebase.getTest(1) as Test;
    this.title = test?.title;
    this.questions = await Promise.all(
      test.questions.map(id => this.firebase.getQuestion(id))
    ) as any;

    this.userAnswers = this.questions.map(question => {
      if (question.hasOwnProperty('answer')) {
        return 0;
      }
      else {
        return question.body.map(() => false);
      }
    })

    this.loadCounter -= 1;
  }

  public result(): void {
    this.getResult().forEach((res, index) => {
      if (isArray(res)) {
        this.userRes.push(JSON.stringify(this.questions[index].answers) === JSON.stringify(res))
      }
      else {
        this.userRes.push(this.questions[index].answer === res)
      }
    });
  }

  private getResult(): (number | number[])[] {
    return this.userAnswers.map(answer => {
      if (answer.length) {
        const mas: number[] = [];
        (answer as boolean[]).forEach((item, index) => {
          if (item) {
            mas.push(index);
          }
        })
        return mas;
      } else return answer;
    });
  }
}

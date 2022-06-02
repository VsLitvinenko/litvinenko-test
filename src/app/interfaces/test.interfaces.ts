export interface Test {
  title: string;
  questions: number[];
}

export interface Question {
  answer?: number;
  answers?: number[];
  head: string;
  body: string[];
}

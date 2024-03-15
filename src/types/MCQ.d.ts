export interface MCQuestion {
  _id: string;
  statement: string;
  tags?: string[];
  optionsList: MCQOptions[];
}

export interface MCQOptions {
  optionValue: string;
  optionCorrect?: boolean;
}

export interface MCQButton {
  submitted: boolean;
  selectedOption: string | null;
}

export interface MCQRadioOption {
  optionKey: string;
  checked: boolean;
  option: MCQOptions;
  submitted: boolean;
}

export interface QuestionState {
  question: MCQuestion;
  correct: number;
  skipped: number;
  attempts: number;
}

export type Stat = "correct" | "skipped" | "attempts";

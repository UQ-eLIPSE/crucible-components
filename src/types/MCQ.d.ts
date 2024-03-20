export interface MCQQuiz {
  questions: MCQuestion[];
}

export interface MCQuestion {
  _id?: { $oid: string }; //Todo: check if can remove question mark
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

export interface MCQResult {
  correctQuiz: number;
  workQuiz: number;
}

export interface QuestionState {
  question: MCQuestion;
  correct: number;
  skipped: number;
  attempts: number;
}

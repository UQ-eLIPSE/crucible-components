export interface MCQQuiz {
  questions: MCQuestion[];
}

export interface MCQuestion {
  _id: { $oid: string };
  statement: string;
  tags?: string[];
  optionsList: MCQOptions[];
  link: string;
}

export interface MCQuestionProp extends Omit<MCQuestion, "tags" | "link"> {}

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
  quizStatus: QuestionState[];
  workQuiz: number;
}

export interface QuestionState {
  question: MCQuestion;
  correct: number;
  skipped: number;
  attempts: number;
  selectedValue: string;
}

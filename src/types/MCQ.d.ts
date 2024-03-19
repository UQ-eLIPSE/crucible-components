export interface MCQQuiz {
  questions: MCQuestion[];
}

export interface MCQuestion {
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

export interface MCQQuiz {
  questions: MCQProps[];
}

export interface MCQProps {
  title: string;
  tags?: string[];
  options: MCQOptions[];
}

export interface MCQOptions {
  text: string;
  correct?: boolean;
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

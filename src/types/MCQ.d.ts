export interface MCQProps {
  title: string;
  options: MCQOptions[];
}

export interface MCQOptions {
  text: string;
  correct?: boolean;
}

export interface MCQButtonProps {
  selected: boolean;
  submitted: boolean;
  isFinal: boolean;
}

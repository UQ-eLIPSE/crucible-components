export interface MCQProps {
  title: string;
  options: MCQOptions[];
}

export interface MCQOptions {
  text: string;
  correct?: boolean;
}

export interface MCQRadioOption {
  optionKey: string;
  checked: boolean;
  optionText: string;
  optionClass: (key: string) => string;
}

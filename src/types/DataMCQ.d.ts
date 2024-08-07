export type DataTags = string[];

interface DataMCQOptions {
  optionValue: string;
  optionCorrect?: boolean;
}

export interface DataMCQuestion {
  _id: { $oid: string };
  statement: string;
  tags: DataTags;
  optionsList: DataMCQOptions[];
  link: string;
  attempts: number;
  correctAttempts: number;
  reviewDue: Date;
}

export interface DataApi {
  data: {
    questions: DataMCQuestion[];
  };
}

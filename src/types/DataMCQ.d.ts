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
}

export interface DataApi {
  data: {
    questions: DataMCQuestion[];
  };
}

interface DataTags {
  [key: string]: string[];
}

interface DataMCQOptions {
  optionValue: string;
  optionCorrect?: boolean;
}

interface DataMCQuestion {
  _id: { $oid: string };
  statement: string;
  tags: DataTags;
  optionsList: DataMCQOptions[];
  link: string;
}

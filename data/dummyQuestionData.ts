import { tags, MCQuestion } from "../src/plugins/CruciblePlugin/types/MCQ";

interface Option {
  optionValue: string;
  optionCorrect: boolean;
}

interface Question {
  tags: tags;
  statement: string;
  optionsList: Option[];
  _id: {
    $oid: string;
  };
  label: string;
  link: string;
}
const courses: string[] = Array.from(
  { length: 10 },
  (_, i) => `VETS20${i + 10}`,
);
const subjects: string[] = [
  "Anatomy",
  "Biochemistry",
  "Pharmacology",
  "Microbiology",
  "Physiology",
  "Pathology",
  "Immunology",
  "Neurology",
  "Cardiology",
  "Dermatology",
];
const systems: string[] = [
  "Musculoskeletal",
  "Endocrine",
  "Cardiovascular",
  "Immunology",
  "Nervous",
  "Respiratory",
  "Digestive",
  "Urinary",
  "Reproductive",
  "Integumentary",
];

export function generateDummyData(random = false): MCQuestion[] {
  return random ? generateRandomData() : generateStaticData();
}

const generateRandomData = () => {
  const getRandomItem = (items: string[]): string =>
    items[Math.floor(Math.random() * items.length)];

  const data: Question[] = Array.from({ length: 50 }, (_, i) => ({
    tags: {
      course: getRandomItem(courses),
      subject: getRandomItem(subjects),
      system: getRandomItem(systems),
      animal: getRandomItem(["Dog", "Cat", "Horse", "Cow", "Pig"]),
    },
    statement: `Placeholder statement ${i + 1}`,
    optionsList: [
      {
        optionValue: "Placeholder option 1",
        optionCorrect: true,
      },
      {
        optionValue: "Placeholder option 2",
        optionCorrect: false,
      },
    ],
    _id: {
      $oid: `64ba560447d01bfdcb099e${i + 80}`,
    },
    label: `Placeholder label ${i + 1}`,
    link: `https://placeholder.link/${i + 1}`,
  }));

  return data;
};

const generateStaticData = () => {
  let idCounter = 0;
  const data: Question[] = courses.slice(0, 5).flatMap((course, i) =>
    subjects.slice(0, 5).flatMap((subject) =>
      systems.slice(0, 10).map((system) => ({
        tags: {
          course,
          subject,
          system,
          animal: "Horse",
        },
        statement: `Placeholder statement ${idCounter}`,
        optionsList: [
          {
            optionValue: "Placeholder option 1",
            optionCorrect: true,
          },
          {
            optionValue: "Placeholder option 2",
            optionCorrect: false,
          },
        ],
        _id: {
          $oid: `64ba560447d01bfdcb099e${idCounter++}`,
        },
        label: `Placeholder label ${i + 1}`,
        link: `https://placeholder.link/${i + 1}`,
      })),
    ),
  );

  return data;
};

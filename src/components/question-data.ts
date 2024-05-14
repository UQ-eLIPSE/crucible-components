// This sample data is for testing purposes only. It is not intended to be used in production.
// It contains irregular form taxonomy for test purpose
export const pluginQuestions = [
  {
    tags: [
      "course:vets2011",
      "subject:physiology",
      "system:nervous_system",
      "234: wrongtag",
      "  @#: wr ",
    ],
    statement:
      "<p>Which part of a neuron receives information from surrounding cells?</p>",
    optionsList: [
      {
        optionValue: "<p>Axon</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>Presynaptic terminal</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>Cell body</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>Dendrite</p>",
        optionCorrect: true,
      },
      {
        optionValue: "<p>Myelin</p>",
        optionCorrect: false,
      },
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af39b",
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd",
  },
  {
    tags: ["course: VETS2012", "subject: Physiology", "system: Nervous System"],
    statement:
      "<p>Which of the following statements regarding action potentials is TRUE?</p>",
    optionsList: [
      {
        optionValue:
          "<p>Multiple depolarising events minimises the chance of action potential generation</p>",
        optionCorrect: false,
      },
      {
        optionValue:
          "<p>Reaching the subthreshold level does not stimulate the post-synaptic membrane</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>Threshold event generates an action potential</p>",
        optionCorrect: true,
      },
      {
        optionValue:
          "<p>Reaching the subthreshold level is enough to generate an action potential</p>",
        optionCorrect: false,
      },
      {
        optionValue:
          "<p>Depolarised synaptic membrane is more negative than the hyperpolarised membrane</p>",
        optionCorrect: false,
      },
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0b",
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
  },
  {
    tags: [
      "course:vets2012",
      "subject:physiology",
      "animal:horse",
      ": wrongtag",
    ],
    statement:
      "<p>Action potentials are transmitted along which part of a neuron?</p>",
    optionsList: [
      {
        optionValue: "<p>The membrane is more depolarised</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>The effect of the subthreshold is enhanced</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>Action potential is reached</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>A threshold event takes place</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>The membrane is hyperpolarised</p>",
        optionCorrect: true,
      },
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0a",
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
  },
  {
    tags: ["course:vets2012", "subject:physiology", "animal:horse"],
    statement:
      "<p>Which of the following would NOT be possible occurrences when signal build-up occurs?</p>",
    optionsList: [
      {
        optionValue:
          "<p>They can reach action potential as a result of EPSP</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>IPSP can hyperpolarise the membrane</p>",
        optionCorrect: false,
      },
      {
        optionValue:
          "<p>They can reach action potential as a result of IPSP</p>",
        optionCorrect: true,
      },
      {
        optionValue:
          "<p>An action potential will be reached if the number of EPSP &gt; IPSP</p>",
        optionCorrect: false,
      },
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0d",
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
    statement:
      "<p>Action potentials are transmitted along which part of a neuron?</p>",
    optionsList: [
      {
        optionValue: "<p>Axon</p>",
        optionCorrect: true,
      },
      {
        optionValue: "<p>Pre-synaptic terminal</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>Cell body</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>Dendrite</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>Myelin</p>",
        optionCorrect: false,
      },
    ],
    _id: {
      $oid: "6625c7c8c8259deb8c3af39e",
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd",
  },
];

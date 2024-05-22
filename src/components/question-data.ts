// This sample data is for testing purposes only. It is not intended to be used in production.
// It contains irregular form taxonomy for test purpose
export const pluginQuestions = [
  {
    tags: [
      "course:vets2011",
      "course:vets2011",
      "subject:physiology",
      "system:nervous_system",
      "234:tagvalue",
      "  @#:wr ",
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
    tags: [
      "course: VETS2012",
      "course:vets2016",
      "subject: Physiology",
      "system: Nervous System",
    ],
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
    tags: ["course:vets2012", "subject:physiology", "animal:horse"],
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
    tags: ["course: VETS2012", "subject:Physiology", "animal:dog"],
    statement: "<p>When is it impossible to generate an action potential?</p>",
    optionsList: [
      {
        optionValue: "<p>Absolute refractory period</p>",
        optionCorrect: true,
      },
      {
        optionValue: "<p>Relative refractory period</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>Sodium conductance</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>EPSPs after IPSPs</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>Hyperpolarised state</p>",
        optionCorrect: false,
      },
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0f",
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
  },
  {
    tags: ["course: VETS2013", "course:vets2016", "subject:Physiology"],
    statement:
      "<p>Which of the following types of glial cells myelinate neurons in the peripheral nervous system?</p>",
    optionsList: [
      {
        optionValue: "<p>Ependymal cells</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>Schwann cells</p>",
        optionCorrect: true,
      },
      {
        optionValue: "<p>Muller cells</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>Oligodendrocytes</p>",
        optionCorrect: false,
      },
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac11",
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07",
  },
  {
    tags: ["course: VETS2012", "subject:Atonomy", "animal:Horse"],
    statement:
      "<p>Which of the following is an attribute of ependymal cells?</p>",
    optionsList: [
      {
        optionValue: "<p>Repair processes</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>Cerebrospinal fluid synthesis</p>",
        optionCorrect: true,
      },
      {
        optionValue: "<p>Delivering nutrients</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>Recycling of neurotransmitters</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>Maintenance of terminal environment</p>",
        optionCorrect: false,
      },
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac10",
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214413464c71f1df2110d07",
  },
  {
    tags: ["course: VETS2013", "subject:Physiology", "animal:cat"],
    statement:
      "<p>Depending on the pre-synaptic neurotransmitter released and the post-synaptic receptor activated, the post-synaptic membrane can either be depolarised or hyperpolarised. Which of the following statements is FALSE?</p>",
    optionsList: [
      {
        optionValue:
          "<p>Neurotransmitter binding to metabotropic receptors causes a conformational change in pore proteins</p>",
        optionCorrect: true,
      },
      {
        optionValue:
          "The action of metabotropic receptors is slower than ionotropic receptors",
        optionCorrect: false,
      },
      {
        optionValue:
          "Neurotransmitter binding to metabotropic receptors causes a conformational change, activating a signal transduction pathway",
        optionCorrect: false,
      },
      {
        optionValue:
          "An example of an ionotropic receptor is the nicotinic acetylcholine receptor",
        optionCorrect: false,
      },
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86faa",
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d5a64c71f1df2110d16",
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
    statement:
      "Nicotine (mimics acetylcholine) can bind to nicotinic cholinergic receptors. You would expect the response on the post-synaptic membrane to be:",
    optionsList: [
      {
        optionValue: "Excitation due to opening of chloride channels",
        optionCorrect: false,
      },
      {
        optionValue: "Hyperpolarisation due to blocking of sodium channels",
        optionCorrect: false,
      },
      {
        optionValue: "Hyperpolarisation due to opening of chloride channels",
        optionCorrect: false,
      },
      {
        optionValue: "Excitation due to opening of sodium channels",
        optionCorrect: true,
      },
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fac",
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d5a64c71f1df2110d16",
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
    statement:
      "&gamma;-aminobutyric acid (GABA) is a rapidly acting neurotransmitter. You would expect the response on the post-synaptic membrane to be:",
    optionsList: [
      {
        optionValue: "Excitation due to opening of chloride channels",
        optionCorrect: false,
      },
      {
        optionValue: "Hyperpolarisation due to blocking of sodium channels",
        optionCorrect: false,
      },
      {
        optionValue: "Hyperpolarisation due to opening of chloride channels",
        optionCorrect: true,
      },
      {
        optionValue: "Excitation due to opening of sodium channels",
        optionCorrect: false,
      },
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fab",
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d5a64c71f1df2110d16",
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
    statement:
      "<p>At the neuromuscular junction, Ca<sup>2+</sup>&nbsp;ions are necessary for:</p>",
    optionsList: [
      {
        optionValue:
          "<p>Binding the transmitter with the post-synaptic receptor</p>",
        optionCorrect: false,
      },
      {
        optionValue:
          "<p>Facilitating diffusion of the transmitter to the post-synaptic membrane</p>",
        optionCorrect: false,
      },
      {
        optionValue:
          "<p>Splitting the neurotransmitter in the synaptic cleft, deactivating the transmitter</p>",
        optionCorrect: false,
      },
      {
        optionValue:
          "<p>Fusing the pre-synaptic vesicle with the pre-synaptic membrane, thus releasing the transmitter</p>",
        optionCorrect: true,
      },
      {
        optionValue:
          "<p>Metabolising the transmitter within the pre-synaptic vesicle</p>",
        optionCorrect: false,
      },
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fae",
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d7064c71f1df2110d17",
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
    statement:
      "<p>Which of the following statements is TRUE with regard to the termination of the synaptic action at the neuromuscular junction?</p>",
    optionsList: [
      {
        optionValue:
          "<p>The re-uptake of intact acetylcholine molecules into the motor neuron terminal is responsible</p>",
        optionCorrect: false,
      },
      {
        optionValue:
          "<p>Diffusion of acetylcholine away from the synapse is solely responsible</p>",
        optionCorrect: false,
      },
      {
        optionValue:
          "<p>Acetylcholinesterase rapidly breaks down acetylcholine into choline and acetate</p>",
        optionCorrect: true,
      },
      {
        optionValue:
          "<p>Dissociation of acetylcholine from the muscarinic receptor, after binding for several seconds, is solely responsible</p>",
        optionCorrect: false,
      },
    ],
    _id: {
      $oid: "6539c0bdeb2b18699ed86fad",
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62183be064c71f1df2110d0f/62183d7064c71f1df2110d17",
  },
  {
    tags: ["course: VETS2012", "subject:Physiology", "animal:Horse"],
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
      $oid: "6615c7fb49fbda0108a9ac06",
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214301b64c71f1df2110cfd",
  },
];

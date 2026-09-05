import { Question } from "../types/question";

export const SEED_QUESTIONS: Question[] = [
  {
    id: "BIO-001",
    subject: "BIOLOGY",
    chapter: "Cell: The Unit of Life",
    topic: "Endomembrane System",
    questionType: "MCQ",
    difficulty: "EASY",
    questionText: "Which of the following cellular components is NOT considered part of the endomembrane system?",
    options: [
      { id: "A", text: "Endoplasmic Reticulum", isCorrect: false },
      { id: "B", text: "Peroxisome", isCorrect: true },
      { id: "C", text: "Golgi Apparatus", isCorrect: false },
      { id: "D", text: "Lysosome", isCorrect: false }
    ],
    explanation: "The endomembrane system includes ER, Golgi complex, lysosomes, and vacuoles. Functions of mitochondria, chloroplasts, and peroxisomes are not coordinated with these, so they are not part of it.",
    source: "NEET 2023",
    year: 2023,
    tags: ["High-Yield", "NCERT Line", "Cell Biology"]
  },
  {
    id: "PHY-001",
    subject: "PHYSICS",
    chapter: "Electrostatics",
    topic: "Electric Dipole",
    questionType: "MCQ",
    difficulty: "MEDIUM",
    questionText: "An electric dipole of moment $p$ is placed in a uniform electric field $E$. What is the torque acting on it and the potential energy when aligned at an angle $\\theta$?",
    options: [
      { id: "A", text: "$\\tau = pE \\sin\\theta,\\; U = -pE \\cos\\theta$", isCorrect: true },
      { id: "B", text: "$\\tau = pE \\cos\\theta,\\; U = -pE \\sin\\theta$", isCorrect: false },
      { id: "C", text: "$\\tau = -pE \\sin\\theta,\\; U = pE \\cos\\theta$", isCorrect: false },
      { id: "D", text: "$\\tau = 0,\\; U = pE (1 - \\cos\\theta)$", isCorrect: false }
    ],
    explanation: "Torque on a dipole is given by $\\vec{\\tau} = \\vec{p} \\times \\vec{E}$, which has magnitude $pE\\sin\\theta$. Potential energy is $U = -\\vec{p} \\cdot \\vec{E} = -pE\\cos\\theta$.",
    source: "NEET PYQ",
    year: 2022,
    tags: ["Formula-Based", "Electrostatics"]
  },
  {
    id: "CHEM-001",
    subject: "CHEMISTRY",
    chapter: "Chemical Bonding",
    topic: "Hybridisation & Molecular Shape",
    questionType: "MCQ",
    difficulty: "HARD",
    questionText: "Among the molecules $XeF_4$, $SF_4$, and $BF_3$, the geometries around the central atoms are respectively:",
    options: [
      { id: "A", text: "Tetrahedral, Sea-saw, Trigonal Planar", isCorrect: false },
      { id: "B", text: "Square Planar, See-saw, Trigonal Planar", isCorrect: true },
      { id: "C", text: "Square Planar, Tetrahedral, Trigonal Pyramidal", isCorrect: false },
      { id: "D", text: "Square Pyramidal, See-saw, T-shaped", isCorrect: false }
    ],
    explanation: "$XeF_4$ has 4 bond pairs and 2 lone pairs ($sp^3d^2$ hybridisation, square planar). $SF_4$ has 4 bond pairs and 1 lone pair ($sp^3d$ hybridisation, see-saw). $BF_3$ has 3 bond pairs ($sp^2$, trigonal planar).",
    source: "NEET 2024",
    year: 2024,
    tags: ["VSEPR", "Inorganic"]
  }
];
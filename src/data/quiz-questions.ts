import type { QuizQuestion } from "../types/quiz";

const mainQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What does RAG stand for?",
    options: [
      "Really Awesome Guy",
      "Retrieval Augmented Generation",
      "Random Answer Generator",
      "Rapid API Gateway",
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "What is the main problem RAG solves for AI models?",
    options: [
      "Making them run on mobile phones",
      "Preventing the AI from making up false answers (hallucinating)",
      "Making the AI chat in a new language",
      "Sending emails to clients",
    ],
    correctIndex: 1,
  },
  {
    id: 3,
    question:
      'The concept of "Vibe Coding" means you should always do what first before writing code?',
    options: [
      "Take a long break",
      "Plan and create a specific System Prompt",
      "Ask a coworker to do it",
      "Write the tests first",
    ],
    correctIndex: 1,
  },
  {
    id: 4,
    question:
      'What is the name of the tool Sheldon presented to monitor and debug LLM applications, arguing "vibes are not a debugging strategy"?',
    options: ["PostgreSQL", "Langfuse", "Microsoft Word", "Google Drive"],
    correctIndex: 1,
  },
  {
    id: 5,
    question:
      "Lovable and Supabase's tech stack is heavily limited to which programming language?",
    options: ["Python", "Java", "TypeScript", "C++"],
    correctIndex: 2,
  },
  {
    id: 6,
    question:
      "Hybrid Search combines which two types of search to get better results in RAG?",
    options: [
      "Slow Search and Fast Search",
      "Old Search and New Search",
      "Vector Search and Keyword Search",
      "Big Search and Small Search",
    ],
    correctIndex: 2,
  },
  {
    id: 7,
    question:
      "For the best results, what kind of framing structure is recommended for system prompts?",
    options: [
      "Using a simple text file",
      "Using XML-style tags",
      "Using only emojis",
      "Using a spreadsheet",
    ],
    correctIndex: 1,
  },
  {
    id: 8,
    question:
      "Lovable and Supabase are built on top of which foundational database technology?",
    options: ["Microsoft SQL Server", "Oracle", "Postgres", "MongoDB"],
    correctIndex: 2,
  },
  {
    id: 9,
    question:
      "Lovable has a feature that automatically keeps the platform updated when you push code to GitHub. This is called a...",
    options: [
      "Single-way street",
      "Two-way sync",
      "Daily email",
      "Manual upload",
    ],
    correctIndex: 1,
  },
  {
    id: 10,
    question:
      "According to the debugging ladder, if your AI agent is failing, what is the first thing you should try to fix?",
    options: [
      "The hardware",
      "The Prompt",
      "The entire network",
      "The coffee machine",
    ],
    correctIndex: 1,
  },
  {
    id: 11,
    question:
      "For a RAG system to work correctly, the model used to create the database storage must be the same as the model used to create the user query. What kind of model is this?",
    options: [
      "Translation model",
      "Embedding model",
      "Weather model",
      "Stock market model",
    ],
    correctIndex: 1,
  },
  {
    id: 12,
    question: "In Langfuse, what is a 'Session'?",
    options: [
      "One single button click",
      "A complete conversation or full chat thread",
      "A list of all your old documents",
      "A server restart",
    ],
    correctIndex: 1,
  },
  {
    id: 13,
    question:
      "Compared to a big system like Azure, a key benefit of using Lovable/Supabase for small internal projects is that it is often...",
    options: [
      "Much more complicated",
      "Cheaper and easier to set up",
      "Only for front-end development",
      "Used for heavy video editing",
    ],
    correctIndex: 1,
  },
  {
    id: 14,
    question:
      "If a user types a very short or unclear question, what can an LLM be used for in the RAG workflow to improve the search?",
    options: [
      "To ignore the query and make up a new one",
      "To check the user's spelling",
      "To add extra keywords and synonyms to the query",
      "To automatically close the chat session",
    ],
    correctIndex: 2,
  },
  {
    id: 15,
    question:
      'The "LLM-as-a-judge" feature is used to check if the AI\'s final answer follows a certain...',
    options: [
      "Speed requirement",
      "Output structure or fixed format",
      "Image size limit",
      "Music genre",
    ],
    correctIndex: 1,
  },
];

const bonusQuestions: QuizQuestion[] = [
  {
    id: 16,
    question: "Who is Bugik?",
    options: ["Nigel", "Robert", "Rhys", "Jenny"],
    correctIndex: 2,
    isBonus: true,
  },
  {
    id: 17,
    question: "Who is MSTR's AI CAPTAIN?",
    options: ["Silas", "Sil", "Abtien", "Sheldon"],
    correctIndex: 3,
    isBonus: true,
  },
  {
    id: 18,
    question: "Who owns this before?",
    options: ["Din", "Jonnar", "Nigel", "Red"],
    correctIndex: 1,
    isBonus: true,
    image: "/jonnar.png",
  },
  {
    id: 19,
    question: "Who are these cute trio?",
    options: [
      "Din, Sil, Nigel",
      "Robert, Merijn, Rhys",
      "Deric, Sil, Rhys",
      "Robert, Silas, Rhys",
    ],
    correctIndex: 3,
    isBonus: true,
    image: "/trio-hidden.png",
    revealImage: "/trio-reveal.png",
  },
  {
    id: 20,
    question: "Who has these charming eyes?",
    options: ["Sheldon", "Jonnar", "Robert", "Din"],
    correctIndex: 2,
    isBonus: true,
    image: "/eyes.png",
  },
];

// Interleave bonus questions every 3 main questions: positions 4, 8, 12, 16, 20
export const quizQuestions: QuizQuestion[] = [
  ...mainQuestions.slice(0, 3), // Q1-3
  bonusQuestions[0], // Q4 (bonus: Bugik)
  ...mainQuestions.slice(3, 6), // Q5-7
  bonusQuestions[1], // Q8 (bonus: AI Captain)
  ...mainQuestions.slice(6, 9), // Q9-11
  bonusQuestions[2], // Q12 (bonus: jonnar.png)
  ...mainQuestions.slice(9, 12), // Q13-15
  bonusQuestions[3], // Q16 (bonus: trio)
  ...mainQuestions.slice(12, 15), // Q17-19
  bonusQuestions[4], // Q20 (bonus: eyes)
];

import { Slide } from "@/types/slide"

export const slides: Slide[] = [
  {
    id: 1,
    type: "title",
    title: "Don't Make Me Think",
    subtitle: "Usability Principles for the Modern Web",
    content: "Admiral General Alladin",
    number: "00",
  },
  {
    id: 2,
    type: "content",
    title: "Ice Breaker Quiz",
    content:
      "Before we dive in — let's see how much you remember from the learning sessions! Grab your phone, scan the QR code, and join the quiz. Fastest answers score the most points.",
    number: "01",
  },
  {
    id: 3,
    type: "content",
    title: "The Core Principle",
    content:
      "If something requires a user to think, it's probably not as good as it could be. Users should be able to understand what things are and how to use them without expending any mental effort.",
    number: "02",
  },
  {
    id: 4,
    type: "list",
    title: "Key Usability Guidelines",
    content: [
      "Create clear visual hierarchies",
      "Take advantage of conventions",
      "Break pages into clearly defined areas",
      "Make it obvious what's clickable",
      "Eliminate question marks",
      "Omit needless words",
    ],
    number: "03",
  },
  {
    id: 5,
    type: "content",
    title: "How Users Navigate",
    content:
      "Users don't read pages — they scan them. They don't make optimal choices — they satisfice. They don't figure out how things work — they muddle through. Design for this behavior, not for ideal users.",
    number: "04",
  },
  {
    id: 6,
    type: "list",
    title: "Navigation Best Practices",
    content: [
      "Persistent navigation on every page",
      "Clear site ID and page name",
      "Breadcrumbs for orientation",
      "Search functionality when needed",
      "Clear section indicators",
    ],
    number: "05",
  },
  {
    id: 7,
    type: "content",
    title: "Mobile Usability",
    content:
      "Design for thumbs, not cursors. Simplify navigation, prioritize content, and make touch targets generous. The mobile experience should be a first-class citizen, not an afterthought.",
    number: "06",
  },
  {
    id: 8,
    type: "content",
    title: "Usability Testing",
    content:
      "Testing with just a few users — even one! — is better than no testing. Test early and often. The goal is to find problems, not to prove your design is perfect.",
    number: "07",
  },
  {
    id: 9,
    type: "list",
    title: "Key Takeaways",
    content: [
      "Usability is about making things work well",
      "Users are busy and impatient",
      "Good design is invisible — bad design is obvious",
      "Test with real users, not assumptions",
      "Small improvements can have big impacts",
    ],
    number: "08",
  },
  {
    id: 10,
    type: "content",
    title: "Thank You",
    content:
      "The best interface is no interface. When you can't avoid an interface, make it so simple that users don't have to think about how to use it.",
    number: "09",
  },
]

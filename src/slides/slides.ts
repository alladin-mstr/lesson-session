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
      "Grab your phone, scan the QR code, and join the quiz.",
    number: "01",
  },
  {
    id: 12,
    type: "book",
    title: "About the Book",
    content:
      "\"Don't Make Me Think\" by Steve Krug — a timeless guide to web usability, first published in 2000 and still highly relevant today.",
    image: "/cover.png",
    secondaryImage: "/timeline.png",
    number: "01b",
  },
  {
    id: 3,
    type: "content",
    title: "What's the Point?",
    content:
      "A competitor with better UX will win your users — even if your product does the same thing.",
    number: "02",
  },
  {
    id: 4,
    type: "quote",
    title: "First Law of Usability",
    content:
      "\"What's the most important thing I should do if I want to make sure my site or app is easy to use?\" The answer is simple. It's not \"Nothing important should ever be more than two clicks away\" or \"Speak the user's language\" or \"Be consistent.\" It's… Don't make me think!",
    number: "03",
  },
  {
    id: 5,
    type: "list",
    title: "Examples",
    content: [
      "Google's \"45-Second Stare\"",
      "Checkbox vs Radio",
      "Bounce Effect",
    ],
    number: "04",
  },
  {
    id: 6,
    type: "list",
    title: "Diminishing Goodwill",
    content: [
      "Hiding information that I want.",
      "Punishing me for not doing things your way.",
      "Asking me for information you don't really need.",
      "Your site looks amateurish.",
    ],
    number: "05",
  },
  {
    id: 7,
    type: "list",
    title: "Building Goodwill",
    content: [
      "Make the main things obvious and easy.",
      "Tell me what I want to know.",
      "Save me steps wherever you can.",
      "Put effort into it.",
      "Make it easy to recover from errors.",
    ],
    number: "06",
  },
  {
    id: 8,
    type: "content",
    title: "Demo",
    content:
      "**Live redesign** of a ticket creation app — improving its **usability** step by step.",
    number: "07",
  },
  {
    id: 11,
    type: "content",
    title: "Live Redesign",
    content:
      "Let's improve this form together.",
    number: "08",
  },
  {
    id: 9,
    type: "content",
    title: "So Now What?",
    content:
      "Be **mindful of the experience** you're building. Your app should not be a **puzzle** — it should be a **familiar home** where you can get to the bathroom at 3 AM with the lights out.",
    number: "09",
  },
  {
    id: 10,
    type: "content",
    title: "Thank You",
    content:
      "The best interface is no interface. When you can't avoid an interface, make it so simple that users don't have to think about how to use it.",
    number: "10",
  },
]

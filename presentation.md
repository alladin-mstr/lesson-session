# Intro: Title

- Ice breaker
- About the book

---

## What's the point?

People subscribe to a product/service that solves their problem. SaaS is a competitive domain—you may have solved your user's problem with top-notch document processing service but with a painful UX. Eventually there would be a new app that does the same thing but with a lot better UX.

**Examples:**
- **Linear** — It's just a task management app and we already have Jira, Trello, ClickUp, and countless task management apps, but it offers really good UX that users eventually migrated to.
- **1Password** — Before I was thinking that it's just storing strings and encrypting them. I know they do more than that, but the very problem they solved is they got UX so good that you won't need to think about your passwords anymore. When you try to login, it will suggest the saved credentials or suggest if you're trying to login. You just have to click and the click is mindless—which means they're doing a great job.

*Slide note:* Show the purpose and images of Linear and 1Password.

---

## First law of usability

> "What's the most important thing I should do if I want to make sure my site or app is easy to use?" The answer is simple. It's not "Nothing important should ever be more than two clicks away" or "Speak the user's language" or "Be consistent." It's... **"Don't make me think!"**

---

## Examples

1. **Google's "45-Second Stare" Issue** — Show `google-2004-no-footer.png` then reveal `google-2004-with-footer.png`.

2. **Checkbox vs radio buttons** — If you have multiple choice items and the UI is circular, it looks like radio buttons so it's confusing. *Maybe show sample UI with circular multiple choice then reveal the fixed version.*

3. **Simple bounce effect** — Apple introduced the distinctive "bounce" effect (technically called rubber-banding or overscroll bounce) with the launch of the original iPhone in 2007. *Maybe show a UI that mimics that bounce.*

---

## The reservoir of goodwill

Users have different levels of reservoir—some are patient, some are having a bad day. Your app should **increase** this reservoir and **not diminish** it.

### Things that diminish goodwill

- **Hiding information that I want**  
  *Maybe show a UI where services offered do not have a price and you have to contact.*

- **Punishing me for not doing things your way**  
  *Show a booking form UI. Left = bad (no default "FROM" and depart date). Right = good (has defaults). Bad/left: you have to click the dropdown. Right: you can just enter and it'll choose the top option.*

- **Asking me for information that you don't really need**  
  *Maybe like a registration form with a lot of unrelated information.*

- **Your site looks amateurish**  
  *Show bad UI—maybe a login form that's bad.*

### Things that increase goodwill

- **Know the main things that people want to do on your site and make them obvious and easy.**  
  *Maybe like a big action button.*

- **Tell me what I want to know.**  
  *Maybe a checkout showing all the fees and the final amount.*

- **Save me steps wherever you can.**  
  *Show a UI with a recommended document from the list from the BE—BE checked the user details and matched them instead of the user having to think about it.*

- **Put effort into it.**  
  *Vague but it'll be noticed. Maybe a submit button with animation: sending → reviewing → done.*

- **Make it easy to recover from errors.**  
  *Bad form: list of errors at the top. Better form: errors are inline in the inputs themselves.*

---

## Demo

- Redesign a **ticket creation app**.
- Show a bare-bones form: task title, description, status, dates, category, etc.—like a Linear ticket.
- Live demo on how to improve it. *Give me a prompt (show it on the slides) so I can just copy-paste it.*

---

## So now what?

In a fast-moving SaaS app, anything that's not a bug or a blocker is mostly ignored—leaving stacks of usability issues. So during development, **be mindful of the experience** you're trying to build. This is case-by-case, but ultimately: **your app should not be a puzzle** (unless it's literally a puzzle game). It should be a **familiar home** where you can still get to the bathroom at 3am half-asleep with the lights out.

---

# Thank you

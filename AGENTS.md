# AGENTS.md — Trading Knowledge Hub

## 1. Project mission
Build and maintain a beginner-friendly, static educational website explaining cryptocurrency, forex, and gold (XAUUSD). The site must be understandable to students with no prior trading experience. It is educational only: no live trading signals, investment recommendations, promises of profit, or account integration.

## 2. Technical constraints
- Use **HTML5, CSS3, and vanilla JavaScript only**; no frameworks, build tools, external APIs, paid services, or API keys.
- The project must work as a static site on **GitHub Pages** and locally by opening `index.html` in a browser.
- Keep all paths relative so the site also works under a repository subpath.
- No data collection, cookies, tracking, or external scripts.

## 3. File structure
```text
trading-knowledge-hub/
├── index.html            # Homepage, navigation, section layout, lesson dialog
├── AGENTS.md             # AI development rules (this document)
├── README.md             # Setup, publication, project overview
├── assets/
│   ├── style.css         # Shared theme, layout, responsive styling
│   └── app.js            # Lesson rendering, filters, modal interactions
└── content/
    └── lessons.js        # Single source of truth for educational lessons
```

## 4. Visual design system
- Theme: modern dark learning terminal, not a real-time trading platform.
- Base background `#0b1018`; panel `#111a24`; borders `#263341`; main text `#edf3f4`; muted text `#93a3b2`; accent mint `#6de6bc`.
- Use system sans-serif fonts. Large bold headings, concise paragraphs, generous spacing, rounded cards, and subtle borders.
- Preserve the site header, hero, lesson library, principles, about section, footer, and responsive behavior.
- Mobile first in effect: ensure readable text and no horizontal overflow at 375px width; lesson cards become one column on small screens.
- Do not add unrelated colors, flashing effects, or misleading financial charts. The hero illustration is decorative and labeled educational.

## 5. Content format: adding lessons
**Prefer adding a lesson to `content/lessons.js` instead of creating a separate HTML page.** This is the reusable workflow. `window.LESSONS` is an array of plain objects. Every new object must have:
- `id`: unique, lowercase kebab-case, e.g. `crypto-wallets` (never reuse an existing ID).
- `category`: exactly one of `crypto`, `forex`, or `gold`.
- `title`: short, descriptive English heading, ideally 2–6 words.
- `level`: `Beginner` or `Intermediate`.
- `minutes`: positive integer estimated reading time.
- `summary`: one clear English sentence, 10–25 words.
- `points`: array of 3–5 factual, beginner-friendly sentences; each point should teach one idea.

Example:
```js
{
  id: 'crypto-wallets',
  category: 'crypto',
  title: 'Understanding Crypto Wallets',
  level: 'Beginner',
  minutes: 5,
  summary: 'Learn the difference between custodial and self-custody wallets.',
  points: [
    'A wallet manages keys used to access blockchain assets.',
    'Custodial providers control keys on behalf of users.',
    'Never share a seed phrase or private key.'
  ]
}
```
Add the object to the `window.LESSONS` array, separating it from adjacent objects with a comma. Do not change the renderer just to add another lesson. Existing filters and the read-lesson dialog must automatically display the new lesson.

## 6. Writing and accuracy rules
- All website UI and lesson text must be in **English**.
- Explain jargon in plain language; avoid unsupported statistics and time-sensitive market claims.
- Do not imply any chart or number is a live market feed.
- Never provide specific buy/sell instructions, guaranteed returns, or personalized financial advice.
- Mention leverage risk when relevant; avoid promoting excessive risk-taking.
- Use original wording and cite reliable references in the content when introducing nontrivial factual claims in future lessons.

## 7. AI change procedure
1. Read `AGENTS.md` and inspect the existing files before editing.
2. Identify whether the request is **content only** (edit `content/lessons.js`), **style** (edit `assets/style.css`), or **interaction** (edit `assets/app.js` and possibly `index.html`).
3. Make the smallest change needed; do not refactor unrelated sections.
4. Preserve existing lesson IDs, categories, and the schema; do not remove old lessons unless explicitly asked.
5. Use safe DOM APIs (`textContent`, `createElement`) for user-visible lesson content; do not inject lesson data through `innerHTML`.
6. Maintain semantic headings, button labels, keyboard usability, visible focus styles, and responsive design.
7. Update README when project setup or file organization changes.
8. Check the acceptance criteria below before reporting completion.

## 8. When a truly separate page is required
- Ask whether a new lesson card would suffice first. If a standalone page is necessary, name it `topic-name.html` in lowercase kebab-case at the repository root.
- Reuse the global CSS and header/footer styling, use relative links, include a descriptive `<title>`, and add a navigation link from `index.html`.
- Keep the same educational tone, accessible structure, and disclaimer. Do not duplicate CSS into the page.

## 9. Acceptance tests (run after each change)
- Open `index.html`: the hero, six starter lessons, principles, and footer appear without errors.
- Click **All**, **Crypto**, **Forex**, **Gold**: the cards filter correctly (initially 6/2/2/2).
- Click **Read lesson**: a dialog opens with the correct title and points; closing by button and Escape works.
- At narrow mobile widths, navigation and cards remain usable without horizontal scrolling.
- After adding a new lesson to `content/lessons.js`, the new card appears automatically in **All** and its category filter.
- No broken relative paths, no browser console errors, and no third-party dependencies.

## 10. Example future AI request
> Read AGENTS.md, then add a beginner lesson about crypto wallets. Follow the existing lesson schema and writing rules. Do not redesign the homepage. Verify that the new lesson appears under All and Crypto and opens in the dialog.

The purpose of these rules is to make future additions predictable, consistent, and quick, without rebuilding the website each time.

# 33 — CSS box model and responsive layout

**Self-check question:** Can you explain the CSS box model and build a responsive layout using flexbox or grid?

## 1. CSS box model

Every HTML element is a rectangular **box** made of four layers, inside-out:

```
┌──────────────────────────── margin ────────────────────────────┐
│  ┌───────────────────────── border ──────────────────────────┐  │
│  │  ┌────────────────────── padding ──────────────────────┐  │  │
│  │  │  ┌─────────────────── content ────────────────────┐  │  │  │
│  │  │  │  text, images, child elements                  │  │  │  │
│  │  │  └────────────────────────────────────────────────┘  │  │  │
│  │  └──────────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

| Layer | Role |
|-------|------|
| **Content** | Where text and children live; `width` / `height` target this by default |
| **Padding** | Space inside the border, around the content |
| **Border** | Visible edge around the padding |
| **Margin** | Space outside the border, separating this box from neighbors |

### `box-sizing`

- **`content-box` (default in raw CSS):** `width: 300px` = content only; padding and border add extra width.
- **`border-box`:** `width: 300px` includes padding and border — the rendered width stays 300px.

Tailwind's Preflight reset applies `box-sizing: border-box` globally, so utility widths and padding behave predictably.

In this example, each region uses Tailwind box-model utilities:

| Utility | CSS equivalent |
|---------|----------------|
| `p-4` | `padding: 1rem` |
| `p-8` | `padding: 2rem` |
| `border` | `border-width: 1px` |
| `border-gray-300` | border color |
| `rounded-xl` | `border-radius: 0.75rem` |
| `gap-4` | gap between grid/flex children |

---

## 2. Flexbox — one-dimensional layout

Flexbox arranges items in a **single row or column**. Use it when alignment along one axis matters (navbars, toolbars, centering).

### Header in `App.jsx`

```jsx
<header className="md:col-span-2 flex justify-between items-center p-4 ...">
  <span>Logo</span>
  <nav className="flex gap-4">...</nav>
</header>
```

| Tailwind class | What it does |
|----------------|--------------|
| `flex` | `display: flex` — children flow in a row |
| `justify-between` | `justify-content: space-between` — logo left, nav right |
| `items-center` | `align-items: center` — vertical centering |
| `gap-4` (on nav) | space between Home and About |

**When to use flexbox:** one direction, content-driven sizing, distributing space between items.

---

## 3. CSS Grid — two-dimensional layout

Grid defines **rows and columns together**. Use it for page shells, dashboards, and card galleries.

### Page shell (outer `.grid` container)

```jsx
<div className="grid ... grid-cols-1 md:grid-cols-[200px_1fr] md:grid-rows-[auto_1fr_auto]">
```

| Tailwind class | What it does |
|----------------|--------------|
| `grid` | `display: grid` |
| `grid-cols-1` | One column on mobile — header, sidebar, main, footer stack |
| `md:grid-cols-[200px_1fr]` | At 768px+: fixed 200px sidebar + flexible main column |
| `md:grid-rows-[auto_1fr_auto]` | Header/footer auto height; main row grows |
| `md:col-span-2` | Header and footer span both columns on desktop |
| `gap-4` | `gap: 1rem` between grid cells |
| `min-h-[60vh]` | Minimum height so the layout is visible when resizing |

### Card grid (inside `<main>`)

```jsx
<div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
```

This is plain CSS inside an arbitrary Tailwind value:

```css
grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
```

- As many columns as fit, each at least 180px wide.
- Extra space is shared equally (`1fr`).
- Cards wrap automatically — no media query needed.

**When to use grid:** page structure, equal columns, two-dimensional placement.

---

## 4. Responsive layout (mobile-first)

Tailwind breakpoints are **min-width** — styles apply at that size and up:

| Prefix | Min width | Used here for |
|--------|-----------|---------------|
| (none) | 0px | Single-column stack |
| `md:` | 768px | Sidebar + main side by side |

### Mobile (< 768px)

```
┌─────────────┐
│   Header    │
├─────────────┤
│   Sidebar   │
├─────────────┤
│    Main     │
│  [cards…]   │
├─────────────┤
│   Footer    │
└─────────────┘
```

### Desktop (≥ 768px)

```
┌──────────────────────────────┐
│           Header             │
├──────────┬───────────────────┤
│ Sidebar  │      Main         │
│          │   [card] [card]   │
├──────────┴───────────────────┤
│           Footer             │
└──────────────────────────────┘
```

Resize the browser with `npm run dev` to see the breakpoint change.

---

## 5. Flexbox vs Grid — quick rule

| Use **Flexbox** | Use **Grid** |
|-----------------|--------------|
| One row or one column | Rows **and** columns |
| Nav, buttons, inline groups | Page layout, card galleries |
| Content drives size | You define tracks / areas |

This demo uses **both**: Grid for the page shell and card gallery; Flexbox inside the header.

---

## 6. Interview-style summary

> Every element is a box: content → padding → border → margin. I use `border-box` so declared widths include padding and border. Flexbox lays out items in one direction — good for headers and toolbars. Grid lays out rows and columns together — good for page shells and responsive card grids. For responsive design I go mobile-first: single column by default, then `md:` breakpoints or `auto-fit` / `minmax()` so layouts reflow without fixed pixel widths.

---

## Run this example

1. In `src/App.jsx`, ensure this line is uncommented:
   ```js
   export { default } from './33-css-box-model-flexbox-grid/App';
   ```
2. Run `npm run dev` from `section-36-selfCheck`.
3. Open the app and resize the window to compare mobile vs desktop layouts.

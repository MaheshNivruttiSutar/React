# ⚛️ GOD-TIER React.js Complete Course

This is not just another React syllabus. This is a **god-level React roadmap** that combines storytelling, projects, and every essential + advanced modern topic. By the end, students will go from absolute beginner to **production-ready React Engineer** with projects that showcase real-world skills.

---

## 📁 Implemented Lessons (01–21)

| Folder | Topic | Mini Project |
|--------|-------|--------------|
| `01-folder` | Folder structure & Vite boilerplate cleanup | First React app setup |
| `02-components` | Functional components | Navbar + Card components |
| `03-props` | Props & passing data | Reusable Card with props |
| `04-cards-project` | Lists & mapping components | Cards grid project |
| `05-css` | CSS Modules | Button + Header with scoped styles |
| `06-tailwind` | Tailwind CSS utility classes | Tailwind-styled UI |
| `07-ui-project` | Responsive layout & component composition | Landing page (Section1 + Section2) |
| `08-functions` | Event handlers & functions in JSX | Interactive button handlers |
| `09-useState` | `useState` basics | Counter / state updates |
| `10-usestate-advance` | Complex state (objects & arrays) | Advanced state patterns |
| `11-form-handling` | Controlled inputs & form submit | Form handling demo |
| `12-two-way-binding` | Two-way binding pattern | Live input binding |
| `13-notes-app` | CRUD with state | Notes app |
| `14-localstorage` | Persisting state in browser | Notes + localStorage |
| `15-api-calling` | Fetch API & async data | API-driven data display |
| `16-useeffect` | `useEffect` & side effects | Effect lifecycle demo |
| `17-gallery-project` | API + loading states | Gallery app |
| `18-react-router-dom` | React Router v6 basics | Multi-page app (Home, About, Contact) |
| `19-routing-advanced` | Nested routes, params, layouts | Advanced routing with Navbar/Footer |
| `20-bonus-topic` | **Lifting state up (props)** | **Full-page Light/Dark theme toggle** |
| `21-context-api` | **Context API** | **Navbar Light/Dark theme toggle** |

---

## 1. 🌱 Introduction to React

* What is React? Why Facebook built it (story of scalability)
* Library vs Framework
* Virtual DOM vs Real DOM
* SPA vs MPA
* Why React dominates the frontend world
* Using React via **CDN** – First Hello World

**Mini Demo:** Greeting Component

---

## 2. ⚙️ Prerequisites & Setup

* ES6+ JavaScript quick essentials (arrow functions, destructuring, spread/rest, async/await)
* Node.js, npm/yarn basics
* Vite vs CRA vs Webpack (why Vite is preferred)
* GitHub setup & pushing first React repo

**Mini Demo:** Static HTML → Converted into React Component

---

## 3. 📂 Folder Structure & Project Organization

* Cleaning boilerplate (Vite/CRA)
* Understanding `src` folder
* Feature-based vs Atomic Design folder structures
* Importance of scaling-ready structures

**Mini Project:** Portfolio Website (basic static components)

---

## 4. 🧩 React Fundamentals

* Functional Components (modern standard)
* JSX & Babel explained
* Props & Children (passing data between components)
* Lists and Keys (importance of `key`)
* Conditional Rendering
* Re-render vs Render explained deeply

**Mini Projects:**

* Reusable Card Components
* Static Blog Post Layout

---

## 5. ⚡ State Management Basics

* `useState` deep dive
* Updating state correctly (objects, arrays, immutability)
* Batch updates in React
* Event handling with state

**Mini Project:** Counter App

---

## 6. 🔄 Forms, Inputs & Two-Way Binding

* Controlled vs uncontrolled inputs
* `useRef` for uncontrolled fields
* Two-way binding in React
* Multi-step forms

**Mini Project:** Notes App / Undo List

---

## 7. 🎣 Side Effects with `useEffect`

* Why side effects exist
* `useEffect` without deps
* Dependency array explained
* Cleanup functions (timers, listeners)
* Async patterns inside `useEffect`

**Mini Project:** Gallery App (API-driven)

---

## 8. 📡 API Integration & Async Flows

* Fetch & Axios
* Loading, Error, Empty states
* Debouncing & throttling
* Pagination & Infinite Scroll
* CSR vs SSR vs ISR explained

**Mini Projects:**

* Weather App
* GitHub User Search

---

## 9. 🎨 Styling in React

* Inline vs CSS Modules
* Tailwind CSS with `classnames`
* Styled Components (CSS-in-JS)
* Responsive UI basics
* Animation libraries intro (Framer Motion basics)
* Theme-ready CSS with `.light` and `.dark` class selectors

**Mini Project:** UI Landing Page (`07-ui-project`)

> **Note:** The interactive Light/Dark theme switcher is covered in **Lessons 20 & 21** — first with props (lifting state), then with Context API.

---

## 10. 🛣️ Routing with React Router (v6+)

* React Router setup
* Routes & Nested Routes
* Dynamic routes with params
* Protected Routes (Auth Guards)
* 404 handling
* Lazy Loading + Suspense

**Mini Project:** Blog Website with Multiple Pages (`18-react-router-dom`, `19-routing-advanced`)

---

## 11. 🧰 Context API – Global State Without Redux

* Prop drilling problem explained
* Creating and using Context (`createContext`, `Provider`)
* Consuming context with `useContext`
* Updating global state from any nested component
* When NOT to use Context

**Mini Project:** Theme Context – Navbar Light/Dark Toggle (`21-context-api`)

**What students build:**

* `ThemeContext.jsx` — holds `theme` state (`'light'` | `'dark'`) and provides `[theme, setTheme]` via context
* `Navbar.jsx` — reads theme with `useContext` and applies `className={theme}` on the navbar only
* `Button.jsx` — toggles theme: `setTheme(theme === 'light' ? 'dark' : 'light')`
* `index.css` — `.light` / `.dark` navbar styles + centered toggle button layout

**Key takeaway:** Same theme feature from Lesson 20, but without passing props through every component.

> See **Section 21** for the full lesson breakdown and props vs context comparison table.

---

## 12. 🛒 Advanced State Management

* `useReducer` for complex logic
* Custom Hooks for reusable logic
* Props Drilling vs Context vs Redux
* Zustand / Jotai (modern state libraries)

**Mini Project:** Shopping Cart with Reducer

---

## 13. 📦 Redux Toolkit

* Why Redux Toolkit over vanilla Redux
* Store, Reducers, Slices
* Async Thunks for API calls
* Integration with React

**Mini Project:** Notes App with Redux Toolkit

---

## 14. 📡 Advanced API Handling

* React Query / SWR introduction
* Caching & Refetching
* Infinite queries
* Error retries

**Mini Project:** Movie Listing App (TMDB API + React Query)

---

## 15. ⚙️ Performance & Optimization

* React.memo, useMemo, useCallback
* Debounce/Throttle custom hooks
* Avoiding unnecessary re-renders
* Lazy loading components
* Image optimization
* Profiling React apps

**Mini Project:** Large List Filter

---

## 16. 🔐 Authentication & Authorization

* JWT vs Session-based auth
* LocalStorage vs HttpOnly Cookies
* Firebase Auth Integration
* Role-based guards
* AuthContext + Protected Routes (extends the Context pattern from `21-context-api`)

**Mini Project:** Firebase Auth Flow

---

## 17. 🧪 Testing & Debugging

* React DevTools deep dive
* Debugging with console & breakpoints
* Vitest/Jest setup
* Testing with React Testing Library
* Snapshot testing
* Mocking API calls

**Mini Project:** Testing Todo App

---

## 18. 🚀 Deployment & CI/CD

* Building React app for production
* Hosting on Netlify / Vercel / GitHub Pages
* Environment variables
* CI/CD basics with GitHub Actions

---

## 19. 🏆 Final Big Project – Trello-like Task Manager

* Authentication (Login/Signup)
* Multiple boards & tasks
* Drag & Drop with `react-beautiful-dnd`
* Redux Toolkit + React Query combo
* Protected routes with React Router
* Light/Dark theme toggle (combine Lessons 20 & 21 — full-page + navbar, or Context-driven global theme)
* Testing core features
* Deploying live

---

## 20. 🌗 Theme Switcher – Lifting State Up (`20-bonus-topic`)

* Managing theme with `useState` in a parent component
* Passing `theme` and `setTheme` as props to child components
* Binding dynamic CSS classes: `className={theme}`
* Toggling between `'light'` and `'dark'` (case-sensitive — must match CSS class names)
* Full-page theme styles via `.light` and `.dark` in `index.css`

**Mini Project:** Full-page Light/Dark theme toggle with props

**What students build:**

* `App.jsx` — `const [theme, setTheme] = useState('light')` and `<div className={theme}>`
* `Navbar.jsx` — receives `theme` + `setTheme` as props; button toggles: `props.theme === 'light' ? 'dark' : 'light'`
* `index.css` — full-page background, text color, and inverted button styles per theme

**Key takeaway:** State lives in the closest common parent; children receive data and updaters via props.

---

## 21. 🧰 Context API – Navbar Theme (`21-context-api`)

* Replacing prop drilling with React Context
* `createContext` + `Provider` wrapping the app in `main.jsx`
* `useContext(ThemeDataContext)` in deeply nested components (`Navbar`, `Nav2`, `Button`)
* Scoped theming — navbar-only vs full-page (apply `className={theme}` only where needed)
* Centering UI with flexbox (`display: flex` + `justify-content: center`)

**Mini Project:** Navbar Light/Dark toggle powered by Context API

**Comparison with Lesson 20:**

| | Lesson 20 (Props) | Lesson 21 (Context) |
|--|-------------------|---------------------|
| State location | `App.jsx` | `ThemeContext.jsx` |
| Data flow | Props passed manually | `useContext` anywhere in tree |
| Theme scope | Full page | Navbar only |
| Toggle lives in | `Navbar` (via props) | `Button` (via context) |

---

## 22. 🌟 Beyond React (Bonus Section)

* React + TypeScript basics
* Intro to Next.js (SSR, ISR)
* Component Libraries: MUI, ShadCN
* Monorepos (NX/Turborepo)
* CI/CD pipelines for teams
* Auth Context (Login/Logout System) — extends Lesson 21 pattern

---

✨ This is the **God-Tier React Course Syllabus** – complete, modern, and structured for maximum engagement. It covers everything students **must know today** to be job-ready, while keeping them hooked through storytelling and projects.

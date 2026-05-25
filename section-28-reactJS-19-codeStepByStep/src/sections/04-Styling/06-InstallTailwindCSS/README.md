# Install Tailwind CSS

## Quick Overview

Tailwind CSS is a utility-first CSS framework that lets you style elements using pre-built utility classes directly in your HTML/JSX.

## What You'll Learn

- Installing Tailwind with Vite
- Configuration options
- Common utility classes
- Responsive design patterns
- State variants (hover, focus)
- Custom theme configuration
- React component patterns

## Time to Complete

Approximately 25-30 minutes

## Installation Steps

```bash
# 1. Install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 2. Configure content in tailwind.config.js
# 3. Add directives to index.css
# 4. Start using classes
```

## Key Syntax

```jsx
<button className="
  px-4 py-2 
  bg-blue-500 text-white 
  rounded-lg 
  hover:bg-blue-600 
  transition
">
  Click Me
</button>
```

---

**Tip**: Install the "Tailwind CSS IntelliSense" VS Code extension for autocomplete and hover previews!

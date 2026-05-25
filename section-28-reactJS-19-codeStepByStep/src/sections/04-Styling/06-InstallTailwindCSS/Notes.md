# Install Tailwind CSS

## What is Tailwind CSS?

Tailwind CSS is a utility-first CSS framework. Instead of pre-built components, it provides low-level utility classes to build custom designs directly in your markup.

## Installation (Vite + React)

### Step 1: Install dependencies

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 2: Configure content paths

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 3: Add Tailwind directives

```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 4: Import CSS in main.jsx

```jsx
import './index.css'
```

## Core Concepts

### Utility Classes

```html
<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-xl font-bold text-gray-800">Title</h2>
  <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Click
  </button>
</div>
```

### Responsive Design (Mobile First)

```html
<!-- Stack on mobile, row on medium screens -->
<div class="flex flex-col md:flex-row gap-4">
  <div class="w-full md:w-1/2">Left</div>
  <div class="w-full md:w-1/2">Right</div>
</div>
```

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### State Variants

```html
<button class="
  bg-blue-500 
  hover:bg-blue-600 
  focus:ring-2 
  focus:ring-blue-300
  active:bg-blue-700
  disabled:opacity-50
">
  Button
</button>

<input class="
  border 
  border-gray-300 
  focus:border-blue-500 
  focus:ring-1 
  focus:ring-blue-500
" />
```

## Common Utility Classes

### Layout
```
flex, grid, block, inline, hidden
container, mx-auto
```

### Flexbox
```
flex-row, flex-col, flex-wrap
justify-start, justify-center, justify-between, justify-around
items-start, items-center, items-stretch
gap-2, gap-4, gap-8
```

### Spacing
```
p-4 (padding: 1rem)
px-4 (padding-left/right)
py-2 (padding-top/bottom)
m-4 (margin)
mt-2 (margin-top)
space-y-4 (gap between children)
```

### Sizing
```
w-full, w-1/2, w-64, w-screen
h-full, h-screen, h-64
max-w-lg, max-w-xl, max-w-2xl
min-h-screen
```

### Typography
```
text-sm, text-base, text-lg, text-xl, text-2xl
font-normal, font-medium, font-semibold, font-bold
text-left, text-center, text-right
leading-tight, leading-normal, leading-loose
tracking-tight, tracking-wide
```

### Colors
```
text-gray-500, text-blue-600
bg-white, bg-gray-100, bg-blue-500
border-gray-300, border-red-500
```

### Borders
```
border, border-2, border-4
border-t, border-b, border-l, border-r
rounded, rounded-md, rounded-lg, rounded-full
```

### Effects
```
shadow-sm, shadow-md, shadow-lg, shadow-xl
opacity-50, opacity-75
```

## Custom Configuration

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          500: '#667eea',
          600: '#5a67d8',
        },
      },
      spacing: {
        '128': '32rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
}
```

## React Component Patterns

### With Class Strings

```jsx
function Button({ variant, children }) {
  const baseClasses = 'px-4 py-2 rounded-lg font-semibold transition';
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  );
}
```

### With clsx or classnames

```jsx
import clsx from 'clsx';

function Button({ primary, disabled, children }) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-lg font-semibold',
        primary ? 'bg-blue-500 text-white' : 'bg-gray-200',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

## Useful Plugins

```javascript
// tailwind.config.js
plugins: [
  require('@tailwindcss/forms'),      // Better form styles
  require('@tailwindcss/typography'), // Prose styling
  require('@tailwindcss/aspect-ratio'), // Aspect ratios
]
```

## VS Code Extension

Install "Tailwind CSS IntelliSense" for:
- Autocomplete
- Linting
- Hover previews
- Class sorting

## Best Practices

1. **Use consistent spacing** - Stick to the scale (2, 4, 6, 8)
2. **Extract components** - Don't repeat long class strings
3. **Use @apply sparingly** - Prefer component extraction
4. **Purge unused styles** - Content paths must be correct
5. **Mobile first** - Base styles for mobile, add breakpoints

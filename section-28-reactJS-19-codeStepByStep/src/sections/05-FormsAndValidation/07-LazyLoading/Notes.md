# Lazy Loading in React

## What is Lazy Loading?

Lazy loading (code splitting) delays loading of components until they're needed. This reduces initial bundle size and improves performance.

## Basic Syntax

```jsx
import { lazy, Suspense } from 'react';

// Lazy load component
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## How It Works

1. `lazy()` creates a component that loads on first render
2. `import()` returns a Promise for the module
3. `Suspense` shows fallback while loading
4. Component renders after loading completes

## Conditional Lazy Loading

```jsx
const Chart = lazy(() => import('./Chart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Load Chart
      </button>
      
      {showChart && (
        <Suspense fallback={<Spinner />}>
          <Chart />
        </Suspense>
      )}
    </div>
  );
}
```

## Route-Based Code Splitting

```jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}
```

## Named Exports

```jsx
// For named exports, use intermediate module
// ChartModule.js
export { Chart } from './Chart';

// App.js
const Chart = lazy(() => 
  import('./ChartModule').then(module => ({ default: module.Chart }))
);
```

## Error Boundaries

```jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Failed to load component</div>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
```

## Preloading Components

```jsx
// Preload on hover or other events
const Chart = lazy(() => import('./Chart'));

// Preload function
const preloadChart = () => {
  import('./Chart');
};

function Dashboard() {
  return (
    <button 
      onMouseEnter={preloadChart}
      onClick={() => setShowChart(true)}
    >
      Show Chart
    </button>
  );
}
```

## Multiple Suspense Boundaries

```jsx
function App() {
  return (
    <div>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      
      <Suspense fallback={<ContentSkeleton />}>
        <MainContent />
      </Suspense>
      
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
    </div>
  );
}
```

## Loading States

### Simple Spinner

```jsx
function Spinner() {
  return <div className="spinner" />;
}

<Suspense fallback={<Spinner />}>
```

### Skeleton Screen

```jsx
function CardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image" />
      <div className="skeleton-text" />
      <div className="skeleton-text short" />
    </div>
  );
}
```

### Full Page Loader

```jsx
function PageLoader() {
  return (
    <div className="page-loader">
      <div className="spinner" />
      <p>Loading page...</p>
    </div>
  );
}
```

## When to Use Lazy Loading

**Good candidates:**
- Route components
- Modals and dialogs
- Heavy components (charts, editors)
- Features behind tabs
- Admin-only features
- Below-the-fold content

**Not recommended:**
- Small, frequently used components
- Components in the initial viewport
- Critical UI elements

## Performance Tips

1. **Split by route** - Each page as separate chunk
2. **Split by feature** - Admin, settings as separate chunks
3. **Avoid over-splitting** - Too many chunks = too many requests
4. **Use preloading** - Anticipate user actions
5. **Add loading states** - Skeleton screens > spinners

## Bundle Analysis

```bash
# Analyze your bundle
npm install --save-dev webpack-bundle-analyzer

# Or for Vite
npm install --save-dev rollup-plugin-visualizer
```

## Best Practices

1. **Always use Suspense** - Required for lazy components
2. **Handle errors** - Use Error Boundaries
3. **Meaningful fallbacks** - Skeleton screens preferred
4. **Strategic splitting** - Don't over-do it
5. **Test loading states** - Simulate slow networks

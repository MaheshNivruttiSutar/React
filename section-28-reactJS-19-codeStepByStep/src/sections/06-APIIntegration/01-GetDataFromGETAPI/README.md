# GET Data from API

## Quick Overview

Learn how to fetch data from APIs using the Fetch API with proper loading states, error handling, and cleanup patterns.

## What You'll Learn

- Basic fetch pattern with async/await
- Managing loading, error, and data states
- Query and URL parameters
- Dependent API calls
- Cleanup with AbortController
- Error handling best practices

## Time to Complete

Approximately 20-25 minutes

## Prerequisites

- useState and useEffect hooks
- Async/await JavaScript
- JSON data format

## Key Pattern

```jsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed');
      setData(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [url]);
```

---

**Tip**: Always use try/catch/finally to ensure loading state gets reset even when errors occur!

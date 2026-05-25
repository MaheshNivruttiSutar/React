# GET Data from API

## What is a GET Request?

A GET request is used to retrieve data from a server. It's the most common HTTP method and is used when you want to fetch information without modifying anything on the server.

## Basic Fetch Pattern

```jsx
const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    setData(data);
  } catch (error) {
    setError(error.message);
  }
};
```

## Complete Pattern with Loading & Error States

```jsx
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## State Management for API Calls

```jsx
// Three essential states for API calls
const [data, setData] = useState(null);     // The fetched data
const [loading, setLoading] = useState(false); // Loading indicator
const [error, setError] = useState(null);    // Error message
```

## Fetching with Parameters

### Query Parameters

```jsx
// Fetch posts by user ID
const fetchPostsByUser = async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  const posts = await response.json();
  return posts;
};

// Fetch with multiple params
const fetchWithFilters = async (filters) => {
  const params = new URLSearchParams(filters);
  const response = await fetch(`/api/products?${params}`);
  return response.json();
};

// Usage
fetchWithFilters({ category: 'electronics', sort: 'price', limit: 10 });
// URL: /api/products?category=electronics&sort=price&limit=10
```

### URL Parameters

```jsx
// Fetch single item by ID
const fetchUser = async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  return response.json();
};
```

## Dependent API Calls

When one API call depends on the result of another:

```jsx
function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchPostsByUser(userId).then(setPosts);
    }
  }, [userId]); // Re-fetch when userId changes

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>{post.title}</article>
      ))}
    </div>
  );
}
```

## Cleanup and Cancellation

### Using AbortController

```jsx
useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        signal: controller.signal
      });
      const data = await response.json();
      setData(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    }
  };

  fetchData();

  return () => controller.abort();
}, [url]);
```

### Using Cancelled Flag

```jsx
useEffect(() => {
  let cancelled = false;

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    
    if (!cancelled) {
      setData(data);
    }
  };

  fetchData();

  return () => {
    cancelled = true;
  };
}, [url]);
```

## Error Handling

### HTTP Status Codes

```jsx
const fetchWithErrorHandling = async (url) => {
  const response = await fetch(url);
  
  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error('Bad Request');
      case 401:
        throw new Error('Unauthorized - Please login');
      case 403:
        throw new Error('Forbidden - Access denied');
      case 404:
        throw new Error('Not Found');
      case 500:
        throw new Error('Server Error - Try again later');
      default:
        throw new Error(`HTTP Error: ${response.status}`);
    }
  }
  
  return response.json();
};
```

## Common APIs for Practice

| API | URL | Description |
|-----|-----|-------------|
| JSONPlaceholder | jsonplaceholder.typicode.com | Fake REST API |
| Random User | randomuser.me/api | Random user data |
| PokéAPI | pokeapi.co/api/v2 | Pokémon data |
| REST Countries | restcountries.com/v3.1 | Country information |

## Best Practices

1. **Always handle loading states** - Show feedback while fetching
2. **Always handle errors** - Display user-friendly messages
3. **Clean up on unmount** - Prevent memory leaks
4. **Use try/catch/finally** - Ensure loading state is reset
5. **Check response.ok** - Handle HTTP errors properly
6. **Include dependencies** - Add fetch params to useEffect deps

## Common Mistakes

```jsx
// ❌ Missing error handling
useEffect(() => {
  fetch(url).then(res => res.json()).then(setData);
}, []);

// ✅ Proper error handling
useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed');
      setData(await res.json());
    } catch (err) {
      setError(err.message);
    }
  };
  fetchData();
}, []);
```

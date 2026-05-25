# Setup JSON Server

## What is JSON Server?

JSON Server is a lightweight tool that creates a full REST API from a simple JSON file. It's perfect for:
- Prototyping and development
- Learning API integration
- Frontend development without a backend
- Mocking APIs for testing

## Installation

```bash
# Global installation
npm install -g json-server

# Project-specific (recommended)
npm install json-server --save-dev
```

## Quick Start

### 1. Create db.json

```json
{
  "users": [
    { "id": 1, "name": "John Doe", "email": "john@example.com" },
    { "id": 2, "name": "Jane Smith", "email": "jane@example.com" }
  ],
  "posts": [
    { "id": 1, "title": "Hello World", "body": "My first post", "userId": 1 }
  ]
}
```

### 2. Start the Server

```bash
json-server --watch db.json --port 3001
```

### 3. Access Your API

```
http://localhost:3001/users
http://localhost:3001/posts
```

## Auto-Generated Endpoints

For each resource in db.json, JSON Server creates:

| HTTP Method | Endpoint | Description |
|------------|----------|-------------|
| GET | /users | Get all users |
| GET | /users/1 | Get user by id |
| POST | /users | Create user |
| PUT | /users/1 | Replace user |
| PATCH | /users/1 | Update user |
| DELETE | /users/1 | Delete user |

## Query Parameters

### Filtering
```
GET /posts?userId=1
GET /users?role=admin
GET /products?price_gte=100&price_lte=500
```

### Pagination
```
GET /posts?_page=1&_limit=10
```

Response includes headers:
- `X-Total-Count`: Total items

### Sorting
```
GET /posts?_sort=createdAt&_order=desc
GET /users?_sort=name&_order=asc
```

### Full-text Search
```
GET /posts?q=react
```

### Relationships
```
GET /posts?_embed=comments   # Include child resources
GET /comments?_expand=post   # Include parent resource
```

## Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "server": "json-server --watch db.json --port 3001",
    "dev:all": "concurrently \"npm run dev\" \"npm run server\""
  },
  "devDependencies": {
    "json-server": "^0.17.4",
    "concurrently": "^8.2.2"
  }
}
```

## Sample db.json

```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin",
      "createdAt": "2024-01-01"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "user",
      "createdAt": "2024-01-15"
    }
  ],
  "posts": [
    {
      "id": 1,
      "title": "Getting Started with React",
      "body": "React is a JavaScript library...",
      "userId": 1,
      "createdAt": "2024-02-01"
    }
  ],
  "comments": [
    {
      "id": 1,
      "postId": 1,
      "text": "Great article!",
      "author": "Jane"
    }
  ]
}
```

## API Service Pattern

Create a dedicated file for API calls:

```javascript
// services/api.js
const API_URL = 'http://localhost:3001';

export const userService = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/users`);
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`);
    return response.json();
  },

  create: async (user) => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    return response.json();
  },

  update: async (id, user) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    return response.json();
  },

  delete: async (id) => {
    await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
  }
};
```

## Usage in React

```jsx
import { useState, useEffect } from 'react';
import { userService } from './services/api';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getAll()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    await userService.delete(id);
    setUsers(users.filter(u => u.id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name}
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

## Important Notes

1. **ID is required**: Every item needs a unique `id` field
2. **Auto-increment**: POST requests auto-generate IDs
3. **File updates**: db.json updates automatically on write operations
4. **Default port**: 3000 (use different port to avoid conflict with React)
5. **CORS enabled**: Works with frontend on different port by default

## Common Issues

| Issue | Solution |
|-------|----------|
| Port conflict | Use `--port 3001` |
| db.json not found | Run from project root |
| CORS errors | JSON Server handles CORS automatically |
| Changes not persisting | Check file permissions |

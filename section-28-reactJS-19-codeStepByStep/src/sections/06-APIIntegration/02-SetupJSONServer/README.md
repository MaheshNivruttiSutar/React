# Setup JSON Server

## Quick Overview

JSON Server creates a full REST API from a JSON file in seconds. Perfect for learning API integration and prototyping without a real backend.

## What You'll Learn

- Installing JSON Server
- Creating db.json database file
- Understanding auto-generated endpoints
- Query parameters (filter, sort, paginate)
- Running JSON Server with React
- API service pattern

## Time to Complete

Approximately 15-20 minutes

## Prerequisites

- Node.js and npm
- Basic understanding of REST APIs
- React project setup

## Quick Start

```bash
# Install
npm install json-server --save-dev

# Create db.json
echo '{"users":[{"id":1,"name":"John"}]}' > db.json

# Start server
json-server --watch db.json --port 3001
```

## Endpoints Created

For each resource (users, posts, etc.):
- GET /users - All items
- GET /users/1 - Single item
- POST /users - Create
- PUT /users/1 - Update
- DELETE /users/1 - Delete

---

**Tip**: Use port 3001 for JSON Server to avoid conflicts with React's default port 3000!

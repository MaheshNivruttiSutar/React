# Section 22 - React Router v7 (In Depth)

This project covers React Router in depth — loaders, actions, error elements, breadcrumbs, nested layouts, and more.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Install JSON Server (globally, if not already installed)

```bash
npm install -g json-server
```

### 3. Start the JSON Server (fake REST API)

```bash
json-server --watch data/db.json --port 4000
```

This serves the careers data at `http://localhost:4000/careers`.

### 4. Start the Vite Dev Server

```bash
npm run dev
```

This starts the app at `http://localhost:5173`.

## Switching Between Topics

Open `src/App.jsx` and uncomment the topic you want to run (comment the rest):

```
1-react-router-basics
2-router-provider
3-nested-routes-and-layouts
4-custom-404-page
5-loaders
6-route-parameters
7-error-elements
8-making-breadcrumbs
9-forms-and-actions
10-navigate-component
```

## Servers Summary

| Server | Command | URL |
|--------|---------|-----|
| Vite Dev Server | `npm run dev` | http://localhost:5173 |
| JSON Server (API) | `json-server --watch data/db.json --port 4000` | http://localhost:4000 |

> **Note:** Topics 5-10 require the JSON Server to be running for loaders/actions to work.

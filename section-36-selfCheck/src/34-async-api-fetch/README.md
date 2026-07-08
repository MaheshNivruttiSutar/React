# 34 — Async function that fetches from an API

**Self-check question:** Can you write an async function that fetches data from an API?

## Topics to cover

- `async` / `await` syntax
- `fetch` and `response.json()`
- Calling an async function from `useEffect`
- Basic error handling with `try` / `catch`

## Example

```js
async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data;
}
```

## Practice

Add your notes and example code in this folder.

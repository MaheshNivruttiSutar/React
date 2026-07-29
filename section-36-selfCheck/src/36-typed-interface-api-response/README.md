# 36 — Typed interface for an API response

**Self-check question:** Can you define a typed interface for an API response?

## Topics to cover

- Defining an `interface` or `type` for JSON payloads
- Optional vs required fields and nested object shapes
- Typing `fetch` results and component props from API data
- Handling unknown or partial response shapes safely

## Example

```ts
export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address: Address;
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data: User[] = await response.json();
  return data;
}
```

## Practice

Add your notes and example code in this folder.

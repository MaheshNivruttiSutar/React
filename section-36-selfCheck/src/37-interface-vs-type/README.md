# 37 — interface vs type

**Self-check question:** Do you understand the difference between interface and type?

## Topics to cover

- When to use `interface` vs `type` in TypeScript
- Declaration merging (interfaces only)
- Union, intersection, and primitive aliases with `type`
- Extending shapes with `extends` vs `&`

## Example

```ts
// interface — object shapes and extends
interface User {
  name: string;
  email: string;
}

interface Admin extends User {
  role: 'admin';
}

// type — unions and intersections
type Role = 'admin' | 'user' | 'guest';

type Account = User & { role: Role };
```

## Practice

Add your notes and example code in this folder.

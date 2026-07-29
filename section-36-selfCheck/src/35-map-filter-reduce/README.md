# 35 — map, filter, and reduce on arrays

**Self-check question:** Can you use map, filter, and reduce on an array?

## Topics to cover

- `map` — transform each element into a new array
- `filter` — keep elements that pass a condition
- `reduce` — accumulate a single value from an array
- Immutability: avoid mutating the original array

## Example

```js
const orders = [
  { id: 1, item: 'Shirt', price: 25, quantity: 2 },
  { id: 2, item: 'Jeans', price: 60, quantity: 1 },
  { id: 3, item: 'Socks', price: 8, quantity: 3 },
  { id: 4, item: 'Jacket', price: 120, quantity: 1 },
];

const itemNames = orders.map((order) => order.item);

const expensiveOrders = orders.filter((order) => order.price >= 50);

const totalRevenue = orders.reduce(
  (sum, order) => sum + order.price * order.quantity,
  0
);
```

## Practice

Add your notes and example code in this folder.

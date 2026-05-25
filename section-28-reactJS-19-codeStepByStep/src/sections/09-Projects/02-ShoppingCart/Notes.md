# Shopping Cart Project

## What You'll Build

An interactive shopping cart with product listing, quantity management, and real-time total calculation.

## Key Concepts Covered

### 1. Complex State Logic

```jsx
const addToCart = (product) => {
  setCart(prevCart => {
    const existingItem = prevCart.find(item => item.id === product.id);
    if (existingItem) {
      // Update quantity if already in cart
      return prevCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    // Add new item with quantity 1
    return [...prevCart, { ...product, quantity: 1 }];
  });
};
```

**Key Point**: Use functional updates (`prevCart => ...`) when new state depends on previous state.

### 2. useMemo for Computed Values

```jsx
const cartTotal = useMemo(() => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}, [cart]);

const cartItemCount = useMemo(() => {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}, [cart]);
```

**Why useMemo?** Prevents recalculating totals on every render - only recalculates when `cart` changes.

### 3. Array Methods

| Method | Use Case |
|--------|----------|
| `find` | Check if item exists in cart |
| `map` | Update item quantity |
| `filter` | Remove item from cart |
| `reduce` | Calculate totals |

### 4. Quantity Management

```jsx
const updateQuantity = (productId, newQuantity) => {
  if (newQuantity < 1) {
    removeFromCart(productId); // Auto-remove when quantity reaches 0
    return;
  }
  setCart(prevCart =>
    prevCart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    )
  );
};
```

### 5. Static Data Pattern

```jsx
const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, image: '🎧' },
  // ...
];
```

Define static data outside component to prevent recreation on each render.

## State Shape

```jsx
// Cart item structure
{
  id: 1,
  name: 'Wireless Headphones',
  price: 99.99,
  image: '🎧',
  quantity: 2  // Added when item enters cart
}
```

## Features Implemented

- Display product catalog
- Add products to cart
- Increment/decrement quantity
- Remove items from cart
- Clear entire cart
- Real-time total calculation
- Item count display

## CSS Grid Layout

```jsx
// Two-column layout: products (fluid) | cart (fixed 350px)
display: 'grid',
gridTemplateColumns: '1fr 350px',
gap: '2rem'

// 2x3 product grid
display: 'grid',
gridTemplateColumns: 'repeat(2, 1fr)',
gap: '1rem'
```

## Sticky Cart Sidebar

```jsx
position: 'sticky',
top: '1rem',
height: 'fit-content'
```

Cart stays visible while scrolling through products.

## Best Practices Demonstrated

1. **Functional State Updates**: Always use when state depends on previous value
2. **Memoization**: Use useMemo for expensive calculations
3. **Separation**: CRUD operations as separate functions
4. **Edge Cases**: Handle quantity reaching zero

## Extension Ideas

- Product search/filter
- Categories
- Save cart to localStorage
- Apply discount codes
- Product quantities/stock
- useReducer for cart state
- Context API for global cart

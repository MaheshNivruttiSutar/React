import './App.css';

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

console.log('itemNames', itemNames);
console.log('expensiveOrders', expensiveOrders);
console.log('totalRevenue', totalRevenue);

function App() {
  return (
    <div className="App">
      <h1>35 — map, filter, and reduce on arrays</h1>
      <p>Can you use map, filter, and reduce on an array?</p>
      <br />
      <p>map — transform each element into a new array:</p>
      <ul>
        {itemNames.map((name) => (
          <li className='order-item' key={name}>{name}</li>
        ))}
      </ul>
      <br />
      <p>filter — keep elements that pass a condition (price ≥ $50):</p>
      <ul>
        {expensiveOrders.map((order) => (
          <li className='order-item' key={order.id}>
            {order.item} — ${order.price}
          </li>
        ))}
      </ul>
      <br />
      <p>reduce — accumulate a single value: ${totalRevenue}</p>
    </div>
  );
}

export default App;

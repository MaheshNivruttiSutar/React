/*
 * RTL Query: getByDisplayValue & getAllByDisplayValue
 *
 * - Use of getByDisplayValue — find input/textarea/select by current value shown
 * - Use of getAllByDisplayValue — when several fields share the same display value
 * - Test single element with getByDisplayValue
 * - Test multiple elements with getAllByDisplayValue
 *
 * Run: npm test -- src/27-getByDisplayValue-getAllByDisplayValue
 */

import './App.css';

function App() {
  return (
    <main className="App">
      <h1>27 - getByDisplayValue | getAllByDisplayValue</h1>
      <p className="App__subtitle">Invoice editor (pre-filled fields)</p>

      <form aria-label="invoice form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="client">Client name</label>
        <input id="client" type="text" defaultValue="Acme Corp" />

        <label htmlFor="currency">Currency</label>
        <input id="currency" type="text" defaultValue="INR" readOnly />

        <label htmlFor="amount-a">Line item A amount</label>
        <input id="amount-a" type="text" defaultValue="0" />

        <label htmlFor="amount-b">Line item B amount</label>
        <input id="amount-b" type="text" defaultValue="0" />

        <label htmlFor="notes">Notes</label>
        <textarea id="notes" defaultValue="Payment due in 30 days" />
      </form>
    </main>
  );
}

export default App;

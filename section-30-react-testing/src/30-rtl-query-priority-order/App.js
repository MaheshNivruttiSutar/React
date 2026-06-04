/*
 * RTL Query Priority Order — lesson notes
 *
 * Use queries in this order (highest priority first):
 *
 *  1. getByRole          — buttons, headings, inputs, links (best for a11y)
 *  2. getByLabelText     — form fields with <label>
 *  3. getByPlaceholderText — when no label exists
 *  4. getByText          — visible text users read
 *  5. getByDisplayValue  — current value in inputs / textarea / select
 *  6. getByAltText       — images (meaningful alt text)
 *  7. getByTitle         — title attribute tooltips
 *  8. getByTestId        — last resort (data-testid / custom override)
 *
 * Why priority matters:
 * - Higher queries match how users and assistive tech find elements.
 * - Lower queries (especially test id) hide accessibility problems.
 * - Same element may match many queries — pick the highest one that fits.
 *
 * Example on this page (checkout form):
 * - Email field  → prefer getByLabelText(/work email/i)  NOT getByTestId
 * - Pay button   → prefer getByRole('button', { name: /pay now/i })
 * - Help text    → getByText(/secure payment/i)
 *
 * Run: npm test -- src/30-rtl-query-priority-order
 */

import './App.css';

function App() {
  return (
    <main className="App">
      <h1>30 - RTL Query Priority Order</h1>
      <p className="App__priority">
        Priority: Role → Label → Placeholder → Text → Display value → Alt →
        Title → Test id
      </p>

      <form aria-label="checkout" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="work-email">Work email</label>
        <input
          id="work-email"
          type="email"
          placeholder="name@company.com"
          defaultValue="mahesh@celigo.com"
          data-testid="email-input"
        />

        <label htmlFor="coupon">Coupon code</label>
        <input
          id="coupon"
          type="text"
          placeholder="SAVE10"
          defaultValue=""
        />

        <button type="submit" data-testid="pay-button">
          Pay now
        </button>
      </form>

      <p>Secure payment powered by Celigo</p>

      <img
        src="https://img.freepik.com/premium-vector/secure-payment-icon_488544-215.jpg"
        alt="Secure checkout badge"
        title="Verified secure checkout"
        data-testid="secure-badge"
      />
    </main>
  );
}

export default App;

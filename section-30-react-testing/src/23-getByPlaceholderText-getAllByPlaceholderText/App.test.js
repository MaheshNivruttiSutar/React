import { render, screen } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('getByPlaceholderText & getAllByPlaceholderText', () => {
  test('getByPlaceholderText finds single city search input', () => {
    renderApp();
    const city = screen.getByPlaceholderText(/search city/i);
    expect(city).toBeInTheDocument();
    expect(city).toHaveValue('Pune');
  });

  test('getAllByPlaceholderText finds multiple guest name inputs', () => {
    renderApp();
    const guests = screen.getAllByPlaceholderText(/guest full name/i);

    expect(guests).toHaveLength(3);
    expect(guests[0]).toHaveValue('Mahesh Sutar');
    expect(guests[1]).toHaveValue('Priya Shah');
    expect(guests[2]).toHaveValue('Rahul Mehta');
  });
});

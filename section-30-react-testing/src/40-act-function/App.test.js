import { act, useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('act function', () => {
  test('RTL wraps click updates automatically (no manual act needed)', () => {
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: /add 10 points/i }));
    expect(screen.getByText(/points: 10/i)).toBeInTheDocument();
  });

  test('manual act wraps state update before assertion', () => {
    let setPoints;

    function PointsDemo() {
      const [points, setState] = useState(0);
      setPoints = setState;
      return <p>Points: {points}</p>;
    }

    render(<PointsDemo />);
    expect(screen.getByText(/points: 0/i)).toBeInTheDocument();

    act(() => {
      setPoints(30);
    });

    expect(screen.getByText(/points: 30/i)).toBeInTheDocument();
  });
});

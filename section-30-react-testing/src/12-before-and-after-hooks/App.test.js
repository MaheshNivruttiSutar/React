import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('before and after hooks example', () => {
  let renderCount = 0;

  beforeAll(() => {
    renderCount = 0;
  });

  beforeEach(() => {
    renderCount += 1;
  });

  afterAll(() => {
    renderCount = 0;
  });

  test('renders lesson heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', {
        name: /12 - beforeeach \| beforeall \| afterall \| aftereach/i,
      })
    ).toBeInTheDocument();
    expect(renderCount).toBe(1);
  });

  test('renders hooks list', () => {
    render(<App />);
    expect(screen.getByText(/beforeAll — once before all tests/i)).toBeInTheDocument();
    expect(screen.getByText(/afterEach — after each test/i)).toBeInTheDocument();
    expect(renderCount).toBe(2);
  });

  test('updates count on button click', () => {
    render(<App />);
    expect(renderCount).toBe(3);
    const button = screen.getByRole('button', { name: /click me/i });

    fireEvent.click(button);

    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });
});

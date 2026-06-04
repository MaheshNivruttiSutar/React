import { beforeAll, beforeEach, afterEach, afterAll, screen, fireEvent } from '@testing-library/react';

describe('before and after hooks example', () => {
  let renderCount = 0;

  // Runs 1 time — before any test in this describe block
  beforeAll(() => {
    renderCount = 0;
  });

  // Runs before every test — shared setup
  beforeEach(() => {
    renderCount += 1;
  });

  // Runs after every test — cleanup and reset the render count
  afterEach(() => {
    renderCount = 0;
  });

  // Runs 1 time — after all tests in this describe block
  afterAll(() => {
    renderCount = 0;
  });

  test('renders lesson heading', () => {
    expect(
      screen.getByRole('heading', {
        name: /12 - beforeeach \| beforeall \| afterall \| aftereach/i,
      })
    ).toBeInTheDocument();
    expect(renderCount).toBe(1);
  });

  test('renders hooks list', () => {
    expect(screen.getByText(/beforeAll — once before all tests/i)).toBeInTheDocument();
    expect(screen.getByText(/afterEach — after each test/i)).toBeInTheDocument();
    expect(renderCount).toBe(2);
  });

  test('updates count on button click', () => {
    expect(renderCount).toBe(3);
    const button = screen.getByRole('button', { name: /click me/i });

    fireEvent.click(button);

    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
  });
});

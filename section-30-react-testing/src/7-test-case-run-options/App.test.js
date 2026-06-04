/*
 * Practice commands (run from section-30-react-testing folder):
 *
 * 1. This file only:
 *    npm test -- src/7-test-case-run-options
 *
 * 2. Once, no watch:
 *    npm test -- --watchAll=false src/7-test-case-run-options
 *
 * 3. Filter by test name (matches "button" in name):
 *    npm test -- -t "button"
 *
 * 4. In watch mode (npm test):
 *    a → all test files
 *    f → only failed tests (break a test, save, then press f)
 *    p → filter by file pattern (e.g. 7-test)
 *    t → filter by test name (e.g. title)
 *    q → quit
 */

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders lesson title', () => {
    render(<App />);
    expect(
        screen.getByRole('heading', { name: /7 - test case run options/i })
    ).toBeInTheDocument();
});

test('renders intro text about npm test', () => {
    render(<App />);
    expect(screen.getByText(/in the terminal, then try the shortcuts below/i)).toBeInTheDocument();
    expect(screen.getByText('npm test')).toBeInTheDocument();
});

test('renders jest shortcut list', () => {
    render(<App />);
    expect(screen.getByRole('list', { name: /jest watch mode shortcuts/i })).toBeInTheDocument();
    expect(screen.getByText(/specific file/i)).toBeInTheDocument();
    expect(screen.getByText(/failed only/i)).toBeInTheDocument();
});

test('renders practice button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /practice button/i })).toBeInTheDocument();
});

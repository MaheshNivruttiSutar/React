import { render, screen } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('getByRole — semantic headings', () => {
  test('finds h1 and h2 by heading role', () => {
    renderApp();
    expect(
      screen.getByRole('heading', { level: 1, name: /18 - getbyrole query/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /job application form/i })
    ).toBeInTheDocument();
  });
});

describe('getByRole — textbox', () => {
  test('textbox is present with accessible name', () => {
    renderApp();
    expect(screen.getByRole('textbox', { name: /full name/i })).toBeInTheDocument();
  });

  test('textbox has expected value', () => {
    renderApp();
    expect(screen.getByRole('textbox', { name: /full name/i })).toHaveValue(
      'Mahesh Sutar'
    );
  });

  test('enabled textbox is not disabled', () => {
    renderApp();
    expect(screen.getByRole('textbox', { name: /full name/i })).toBeEnabled();
  });

  test('locked employee id textbox is disabled', () => {
    renderApp();
    const lockedField = screen.getByRole('textbox', { name: /employee id/i });
    expect(lockedField).toBeDisabled();
    expect(lockedField).toHaveValue('EMP-2048');
  });
});

describe('getByRole — button', () => {
  test('submit button is present and enabled', () => {
    renderApp();
    const submit = screen.getByRole('button', { name: /submit application/i });
    expect(submit).toBeInTheDocument();
    expect(submit).toBeEnabled();
  });

  test('archive button is present and disabled', () => {
    renderApp();
    const archive = screen.getByRole('button', { name: /archive record/i });
    expect(archive).toBeDisabled();
  });
});

describe('getByRole — table (semantic)', () => {
  test('finds table by role and caption name', () => {
    renderApp();
    expect(
      screen.getByRole('table', { name: /recent applications/i })
    ).toBeInTheDocument();
  });

  test('finds column headers and cell content', () => {
    renderApp();
    expect(screen.getByRole('columnheader', { name: /applicant/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /frontend developer/i })).toBeInTheDocument();
  });
});

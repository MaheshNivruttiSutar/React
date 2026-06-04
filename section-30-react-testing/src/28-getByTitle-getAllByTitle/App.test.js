import { render, screen } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('getByTitle — single element', () => {
  test('finds image by unique title attribute', () => {
    renderApp();
    expect(screen.getByTitle('Project specification PDF')).toBeInTheDocument();
  });

  test('finds save button by title tooltip', () => {
    renderApp();
    const save = screen.getByTitle('Save document');
    expect(save).toHaveTextContent('Save');
  });

  test('finds help button by title', () => {
    renderApp();
    expect(screen.getByTitle('Help')).toHaveTextContent('Help');
  });
});

describe('getAllByTitle — multiple elements', () => {
  test('finds two abbr elements sharing title HyperText Markup Language', () => {
    renderApp();
    const htmlAbbrs = screen.getAllByTitle('HyperText Markup Language');

    expect(htmlAbbrs).toHaveLength(2);
    expect(htmlAbbrs[0]).toHaveTextContent('HTML');
    expect(htmlAbbrs[1]).toHaveTextContent('HTML5');
  });

  test('finds unique CSS abbr by title', () => {
    renderApp();
    expect(screen.getByTitle('Cascading Style Sheets')).toHaveTextContent('CSS');
  });
});

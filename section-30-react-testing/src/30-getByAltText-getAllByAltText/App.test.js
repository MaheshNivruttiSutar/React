import { render, screen } from '@testing-library/react';
import App from './App';

function renderApp() {
  render(<App />);
}

describe('getByAltText — single image', () => {
  test('finds hero image by unique alt text', () => {
    renderApp();
    const hero = screen.getByAltText('Himalayan peak at sunrise');
    expect(hero).toHaveClass('App__hero');
  });

  test('finds offer badge by alt text', () => {
    renderApp();
    expect(screen.getByAltText('Limited offer badge')).toHaveClass('App__badge');
  });
});

describe('getAllByAltText — multiple images', () => {
  test('finds all thumbnail images with shared alt text', () => {
    renderApp();
    const thumbnails = screen.getAllByAltText('Gallery thumbnail');

    expect(thumbnails).toHaveLength(3);
    thumbnails.forEach((img) => expect(img.tagName).toBe('IMG'));
  });

  test('getByAltText would fail when alt text is duplicated', () => {
    renderApp();
    expect(() => screen.getByAltText('Gallery thumbnail')).toThrow();
  });
});

import { render, screen } from '@testing-library/react';
import App from './App';

// test('finds image by alt attribute', () => {
//   render(<App />);
//   const image = screen.getByAltText('dummy');
//   expect(image).toBeInTheDocument();
//   expect(image).toHaveAttribute(
//     'src',
//     'https://kupidonia.com/content/quiz/photo/big/2306_1.jpg'
//   );
// });

test('finds image by alt attribute 2', () => {
    render(<App />);
    const images = screen.getAllByAltText('dummy');
    expect(images).toHaveLength(3);
    for (const image of images) {
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute(
        'src',
        'https://kupidonia.com/content/quiz/photo/big/2306_1.jpg'
      );
    }
  });
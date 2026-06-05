import { rest } from 'msw';

export const recipeHandlers = [
  rest.get('/api/recipes', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, title: 'Masala Dosa', cuisine: 'South Indian' },
        { id: 2, title: 'Pav Bhaji', cuisine: 'Mumbai Street' },
      ])
    );
  }),
];
